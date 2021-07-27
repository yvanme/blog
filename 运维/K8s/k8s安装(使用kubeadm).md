k8s安装(使用kubeadm)

## 介绍

[TOC]

**主机配置:**

| 主机名 | IP地址          |
| ------ | --------------- |
| master | 192.168.153.130 |
| node1  | 192.168.153.131 |
| node2  | 192.168.153.132 |

**系统：CentOS7**

**docker版本：19.03.5**

**k8s版本：1.16.2**

**1. k8s安装**

-  修改主机名

```shell
#永久修改主机名，你可以修改静态主机名
hostnamectl --static set-hostname <host-name>
```

-  关闭防火墙、swap、selinux

```shell
# 关闭防火墙
systemctl stop firewalld && systemctl disable firewalld
# 关闭swap
swapoff -a
sed -i '/swap/s/^\(.*\)$/#\1/g' /etc/fstab
# 关闭selinux
setenforce 0
vi /etc/selinux/config
#SELINUX修改为disabled
SELINUX=disabled
```

-   系统参数设置

```shell
# 制作配置文件
cat > /etc/sysctl.d/kubernetes.conf <<EOF
net.bridge.bridge-nf-call-iptables=1
net.bridge.bridge-nf-call-ip6tables=1
net.ipv4.ip_forward=1
vm.swappiness=0
vm.overcommit_memory=1
vm.panic_on_oom=0
fs.inotify.max_user_watches=89100
EOF
# 生效文件
$ sysctl -p /etc/sysctl.d/kubernetes.conf
```

-   配置K8S源 

```shell
## 配置k8s源
cat <<EOF > /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=0
EOF
 
## 重建yum缓存
yum clean all
yum makecache fast
yum -y update
```

-   安装kubeadm，kubelet 

```http
yum install -y kubeadm kubelet
```

- 初始化kubeadm

  -  这里不直接初始化，因为国内用户不能直接拉取相关的镜像，所以这里想查看需要的镜像版本 

    ```
    kubeadm config images list
    ```

  -  根据需要的版本，直接拉取国内镜像，并修改tag 

    ```shell
    vim kubeadm.sh
     
    #!/bin/bash
    ## 使用如下脚本下载国内镜像，并修改tag为google的tag
    set -e
     
    KUBE_VERSION=v1.16.2
    KUBE_PAUSE_VERSION=3.1
    ETCD_VERSION=3.3.15-0
    CORE_DNS_VERSION=1.6.2
     
    GCR_URL=k8s.gcr.io
    ALIYUN_URL=registry.cn-hangzhou.aliyuncs.com/google_containers
     
    images=(kube-proxy:${KUBE_VERSION}
    kube-scheduler:${KUBE_VERSION}
    kube-controller-manager:${KUBE_VERSION}
    kube-apiserver:${KUBE_VERSION}
    pause:${KUBE_PAUSE_VERSION}
    etcd:${ETCD_VERSION}
    coredns:${CORE_DNS_VERSION})
     
    for imageName in ${images[@]} ; do
      docker pull $ALIYUN_URL/$imageName
      docker tag  $ALIYUN_URL/$imageName $GCR_URL/$imageName
      docker rmi $ALIYUN_URL/$imageName
    done
    ```

  -  运行脚本，拉取镜像 

    ```
    ./kubeadm.sh
    ```

-  master节点安装

```shell
sudo kubeadm init \
 --apiserver-advertise-address 192.168.153.130 \
 --kubernetes-version=v1.16.2 \
 --pod-network-cidr=10.244.0.0/16
```

-  获取添加节点命令

```shell
kubeadm token create --print-join-command
```

-  node节点安装（使用获取到的命令安装node节点）

```shell
kubeadm join 192.168.153.130:6443 --token re24q1.7sin74aq7c0awnru \
    --discovery-token-ca-cert-hash sha256:82e68e2af70c642e7307c68505f513149c364867fd368ab0305c85ad2777f037 \
   --ignore-preflight-errors=all 
```

- 安装flanneld

  -  master节点上执行如下命令 

    ```shell
    mkdir -p $HOME/.kube
    sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
    sudo chown $(id -u):$(id -g) $HOME/.kube/config
    ```

  -  下载flannel配置文件 

    ```shell
    wget https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
    ```

  -  因为kube-flannel.yml文件中使用的镜像为quay.io的，国内无法拉取，所以同样的先从国内源上下载，再修改tag，脚本如下 

    ```shell
    vim flanneld.sh
     
    #!/bin/bash
    set -e
     
    FLANNEL_VERSION=v0.11.0
     
    # 在这里修改源
    QUAY_URL=quay.io/coreos
    QINIU_URL=quay-mirror.qiniu.com/coreos
     
    images=(flannel:${FLANNEL_VERSION}-amd64
    flannel:${FLANNEL_VERSION}-arm64
    flannel:${FLANNEL_VERSION}-arm
    flannel:${FLANNEL_VERSION}-ppc64le
    flannel:${FLANNEL_VERSION}-s390x)
     
    for imageName in ${images[@]} ; do
      docker pull $QINIU_URL/$imageName
      docker tag  $QINIU_URL/$imageName $QUAY_URL/$imageName
      docker rmi $QINIU_URL/$imageName
    done
    ```

  -  运行脚本，这个脚本需要在每个节点上执行 

    ```shell
    ./flanneld.sh
    ```

  -  安装flanneld 

    ```shell
    kubectl apply -f kube-flannel.yml
    ```

  -  查看是否正常 

    ```shell
    $  kubectl get pod -n kube-system
    NAME                                 READY   STATUS    RESTARTS   AGE
    coredns-5644d7b6d9-g7hnf             1/1     Running   0          12m
    coredns-5644d7b6d9-ll2vr             1/1     Running   0          12m
    etcd-k8s-master                      1/1     Running   0          11m
    kube-apiserver-k8s-master            1/1     Running   0          11m
    kube-controller-manager-k8s-master   1/1     Running   0          11m
    kube-flannel-ds-amd64-7fqhp          1/1     Running   0          30s
    kube-flannel-ds-amd64-t87t6          1/1     Running   0          30s
    kube-flannel-ds-amd64-t8d6f          1/1     Running   0          30s
    kube-proxy-dv7fl                     1/1     Running   0          9m29s
    kube-proxy-gbfvx                     1/1     Running   0          8m37s
    kube-proxy-ndm5m                     1/1     Running   0          12m
    kube-scheduler-k8s-master            1/1     Running   0          11m
    ```

  -  查看集群是否正常 

    ```shell
    $ kubectl get nodes
    NAME         STATUS   ROLES    AGE     VERSION
    k8s-master   Ready    master   13m     v1.16.2
    k8s-node01   Ready    <none>   9m55s   v1.16.2
    k8s-node02   Ready    <none>   9m3s    v1.16.2
    ```

- Dashboard安装

  - 运行以下命令

    ```shell
    kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0-beta6/aio/deploy/recommended.yaml
    ```

  - 启动dashboard

    ```shell
    kubectl proxy --address='0.0.0.0'  --accept-hosts='^*$'
    ```

  - 访问dashboard

    ```http
    http://192.168.153.132:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/
    ```

  - 登录dashboard

  Dashboard 默认只支持 token 认证，所以如果使用 KubeConfig 文件，需要在该文件中指定 token，我们这里使用token的方式登录

  ```shell
  # 创建service account
  $ kubectl create sa dashboard-admin -n kube-system
  
  # 创建角色绑定关系
  $ kubectl create clusterrolebinding dashboard-admin --clusterrole=cluster-admin --serviceaccount=kube-system:dashboard-admin
  
  # 查看dashboard-admin的secret名字
  $ ADMIN_SECRET=$(kubectl get secrets -n kube-system | grep dashboard-admin | awk '{print $1}')
  
  # 打印secret的token
  $ kubectl describe secret -n kube-system ${ADMIN_SECRET} | grep -E '^token' | awk '{print $2}'
  ```

- 问题解决

  - 访问dashboard报“ no endpoints available for service \"kubernetes-dashboard ”错误

    解决方案： 因为我的dashboard是装在master上，然后k8s服务image是在node上，在master上操作没关注node上image是否在启动，最后node的镜像启动了，访问就没问题了 

  - node节点使用kubectl命令报：“The connection to the server localhost:8080 was refused - did you specify the right host or port”错误

    解决方案： 执行以下命令  export KUBECONFIG=/etc/kubernetes/admin.conf （如果node节点没有admin.conf，请从master节点相同路径获取）