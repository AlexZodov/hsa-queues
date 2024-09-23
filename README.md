# hsa-queues
HSA homework - Queues

## Task
Redis vs Beanstalkd

Set up 3 containers - beanstalkd and redis (rdb and aof).

Write 2 simple scripts: 1st should put message into queue, 2nd should read from queue.

Configure storing to disk.

Compare queues performance.

## How to start
1. Clone the repo to local machine
2. Head to `./producer` on local machine and run `npm install` (required once to create node_modules folder before it will be projected to inner docker container filesystem)
3. Head to `./consumer` on local machine and run `npm install` (required once to create node_modules folder before it will be projected to inner docker container filesystem)
4. Head to `./consumer`, create .env file from .env dist and define there value for variable `MODE` (available values: `beanstalkd`, `redis_rbd`, `redis_aof`)
5. Head to `./producer`, create .env file from .env dist and define there value for variable `MODE` (available values: `beanstalkd`, `redis_rbd`, `redis_aof`)
6. Values for env variable at steps 4 & 5 should be the same !!!
7. Head to root of the cloned repo
8. Run `docker-compose up -d`

## Proofs

1. After both consumer and producer apps are started - they correspondingly produce and consume messages from defined transport
2. Wait several mins, observe each app container logs, they will present time spent to process (produce & consume) of 1M messages
3. If you want to change transport and re-execute experiment:
   1. shut down consumer and producer app containers
   2. change value for `mode` variable in .env file
   3. restart both containers

## Beanstalkd 1M Jobs

### Producer Timelogs:

| Attempt | Time (m:ss.mmm) |
|---------|-----------------|
| 1       | 2:01.685        |
| 2       | 1:56.964        |
| 3       | 2:01.060        |
| 4       | 1:59.954        |
| 5       | 2:03.070        |
| 6       | 2:04.291        |
| 7       | 1:59.097        |
| 8       | 2:02.161        |
| 9       | 2:03.435        |
| 10      | 1:59.791        |
| 11      | 1:58.064        |
| 12      | 2:00.377        |

**Average Producer Time:** `2:00.430` = `120.430 seconds`

```text
Producer Throughput = 1,000,000 jobs / 120.430 seconds = 8,304.82 jobs/second
```

### Consumer Timelogs:

| Attempt | Time (m:ss.mmm) |
|---------|-----------------|
| 1       | 2:39.317        |
| 2       | 2:06.129        |
| 3       | 2:05.652        |
| 4       | 2:04.927        |
| 5       | 2:13.197        |
| 6       | 2:15.808        |
| 7       | 2:14.950        |
| 8       | 2:15.372        |
| 9       | 2:18.608        |
| 10      | 2:19.842        |
| 11      | 2:15.722        |
| 12      | 2:19.160        |
| 13      | 2:19.353        |
| 14      | 2:15.660        |
| 15      | 2:15.379        |

**Average Consumer Time:** `2:14.946` = `134.946 seconds`

```text
Consumer Throughput = 1,000,000 jobs / 134.946 seconds = 7,411.67 jobs/second
```

## Redis RDB 1M Jobs

### Producer Timelogs:

| Attempt | Time (m:ss.mmm) |
|---------|-----------------|
| 1       | 1:42.680        |
| 2       | 1:37.677        |
| 3       | 1:29.795        |
| 4       | 1:28.246        |
| 5       | 1:28.833        |
| 6       | 1:29.413        |
| 7       | 1:30.303        |
| 8       | 1:40.970        |
| 9       | 1:35.040        |
| 10      | 1:32.589        |
| 11      | 1:32.652        |
| 12      | 1:33.372        |

**Average Producer Time:** `1:33.781` = `93.781 seconds`

```text
Producer Throughput = 1,000,000 jobs / 93.781 seconds = 10,661.55 jobs/second
```

### Consumer Timelogs:

| Attempt | Time (m:ss.mmm) |
|---------|-----------------|
| 1       | 1:54.567        |
| 2       | 1:39.856        |
| 3       | 1:34.819        |
| 4       | 1:28.657        |
| 5       | 1:29.342        |
| 6       | 1:28.352        |
| 7       | 1:30.856        |
| 8       | 1:37.440        |
| 9       | 1:35.269        |
| 10      | 1:33.362        |
| 11      | 1:32.998        |
| 12      | 1:32.118        |
| 13      | 1:34.523        |

**Average Consumer Time:** `1:34.370` = `94.370 seconds`

```text
Consumer Throughput = 1,000,000 jobs / 94.370 seconds = 10,594.15 jobs/second
```

## Redis AOF 1M Jobs

### Producer Timelogs:

| Attempt | Time (m:ss.mmm) |
|---------|-----------------|
| 1       | 1:50.096        |
| 2       | 1:46.128        |
| 3       | 1:47.341        |
| 4       | 1:47.773        |
| 5       | 1:46.524        |
| 6       | 1:47.059        |
| 7       | 1:46.486        |
| 8       | 1:46.737        |
| 9       | 1:46.550        |
| 10      | 1:46.755        |
| 11      | 1:46.823        |
| 12      | 1:46.198        |
| 13      | 1:45.692        |
| 14      | 1:45.645        |
| 15      | 1:45.796        |
| 16      | 1:46.950        |
| 17      | 1:46.454        |
| 18      | 1:46.705        |
| 19      | 1:46.595        |
| 20      | 1:46.720        |

**Average Producer Time:** `1:46.600` = `106.600 seconds`

```text
Producer Throughput = 1,000,000 jobs / 106.600 seconds = 9,375.00 jobs/second
```

### Consumer Timelogs:

| Attempt | Time (m:ss.mmm) |
|---------|-----------------|
| 1       | 1:50.156        |
| 2       | 1:46.129        |
| 3       | 1:47.341        |
| 4       | 1:47.773        |
| 5       | 1:46.525        |
| 6       | 1:47.059        |
| 7       | 1:46.485        |
| 8       | 1:46.737        |
| 9       | 1:46.549        |
| 10      | 1:46.755        |
| 11      | 1:46.822        |
| 12      | 1:46.199        |
| 13      | 1:45.693        |
| 14      | 1:45.643        |
| 15      | 1:45.797        |
| 16      | 1:46.950        |
| 17      | 1:46.454        |
| 18      | 1:46.704        |
| 19      | 1:46.595        |
| 20      | 1:46.720        |

**Average Consumer Time:** `1:46.488` = `106.488 seconds`

```text
Consumer Throughput = 1,000,000 jobs / 106.488 seconds = 9,390.00 jobs/second
```