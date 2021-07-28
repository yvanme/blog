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

**k8s版本：1.18.0**

**1. k8s安装**

-  node节点pod启动不起来，显示CrashLoopBackOff

```shell
NAMESPACE     NAME                                       READY   STATUS             RESTARTS   AGE     IP                NODE       NOMINATED NODE   READINESS GATES
kube-system   calico-kube-controllers-76d4774d89-hd867   1/1     Running            0          11m     10.123.188.3      server01   <none>           <none>
kube-system   calico-node-ft29n                          0/1     CrashLoopBackOff   1          9m59s   192.168.153.132   server02   <none>           <none>
kube-system   calico-node-gnzlb                          0/1     CrashLoopBackOff   4          6m23s   192.168.153.133   server03   <none>           <none>
kube-system   calico-node-sqfzv                          1/1     Running            0          11m     192.168.153.131   server01   <none>           <none>

```

- 解决方法calico.yaml,node节点添加环境变量如下

  ```shell
          - name: calico-node
            image: calico/node:v3.14.1
            env:
              # Use Kubernetes API as the backing datastore.
              - name: IP_AUTODETECTION_METHOD 
                value: "can-reach=192.168.153.131"            
              - name: DATASTORE_TYPE
                value: "kubernetes"
              # Wait for the datastore.
              - name: WAIT_FOR_DATASTORE
                value: "true"
              # Set based on the k8s node name.
              - name: NODENAME
                valueFrom:
                  fieldRef:
                    fieldPath: spec.nodeName
  ```
  
  
