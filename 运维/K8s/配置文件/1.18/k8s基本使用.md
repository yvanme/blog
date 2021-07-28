# k8s基本使用

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

**1. nginx配置**

-  nginx.yaml

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx
  namespace: default
spec:
  selector:
    app: nginx
  ports:
  - port: 80
    targetPort: 80
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
  namespace: default
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.7.9
        ports:
        - containerPort: 80
```

- 发布nginx

```shell
kubectl apply -f nginx.yaml
```

- ingress-nginx

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: nginx
  namespace: default
  labels:
    app: nginx
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
  - host: server01
    http:
      paths:
        - path: /
          backend:
            serviceName: nginx
            servicePort: 80
```

- 发布ingress-nginx

```shell
kubectl apply -f ingress-nginx.yaml
```

查看ingress-nginx映射端口

```
kubectl get svc -n ingress-nginx
```

```
NAME            TYPE       CLUSTER-IP    EXTERNAL-IP   PORT(S)                      AGE
ingress-nginx   NodePort   10.10.98.50   <none>        80:30162/TCP,443:30443/TCP   36m
```

访问nginx

```
http://server01:30162/
```

