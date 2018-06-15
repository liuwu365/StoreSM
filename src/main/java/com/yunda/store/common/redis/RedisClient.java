package com.yunda.store.common.redis;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.Transaction;
import redis.clients.jedis.exceptions.JedisException;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Created by Simon on 2017-10-30.
 */
@Component
public class RedisClient {

    private static Logger logger = LoggerFactory.getLogger(RedisClient.class);

    @Autowired
    @Qualifier("spring.redis.pool")
    private JedisPool jedisPool;

    public Jedis getResource() {
        return jedisPool.getResource();
    }

    @SuppressWarnings("deprecation")
    public void returnResource(Jedis jedis) {
        if (jedis != null) {
            jedisPool.returnResourceObject(jedis);
        }
    }

    public void hashSet(String key,String field, String value) {
        Jedis jedis = null;
        try {
            jedis = getResource();
            jedis.hset(key, field, value);
            logger.debug("redis hash set success : key = {}, field={}, value={}", key, field, value);
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("redis hash set error : key = {}, errorMsg = {}", key, e.getMessage());
        } finally {
            returnResource(jedis);
        }

    }

    public String hashGet(String key,String field) {
        Jedis jedis = null;
        String value = null;
        try {
            jedis = getResource();
            value = jedis.hget(key, field);
            logger.debug("redis hash set success : key = {}, field={}, value={}", key, field, value);
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("redis hash set error : key = {}, errorMsg = {}", key, e.getMessage());
        } finally {
            returnResource(jedis);
        }
        return value;

    }

    public void remove(String key) {
        Jedis jedis = null;
        try {
            jedis = getResource();
            jedis.expire(key, 0);
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("Redis remove error: " + e.getMessage() + " - " + key);
        } finally {
            returnResource(jedis);
        }
    }


    public void set(String key, String value) {
        Jedis jedis = null;
        try {
            jedis = getResource();
            jedis.set(key, value);
            logger.debug("Redis set success - " + key + ", value:" + value);
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("Redis set error: " + e.getMessage() + " - " + key + ", value:" + value);
        } finally {
            returnResource(jedis);
        }
    }

    public void setex(String key, String value, Integer seconds) {
        Jedis jedis = null;
        try {
            jedis = getResource();
            jedis.setex(key, seconds, value);
            logger.debug("Redis set success - " + key + ", time = " + seconds + ", value:" + value);
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("Redis set error: " + e.getMessage() + " - " + key + ", time = " + seconds + ", value:" + value);
        } finally {
            returnResource(jedis);
        }
    }

    public String setNx(String lockName, long acquireTimeMs, long timeOutMs) {
        Jedis jedis = null;
        String identifer;
        String retIdentifier = null;
        try {
            jedis = getResource();
            identifer = UUID.randomUUID().toString();
            String lockKey = "lock:" + lockName;
            // 超时时间
            int lockExpire = (int) (timeOutMs / 1000);
            // 获取锁的超时时间
            long end = System.currentTimeMillis() + acquireTimeMs;

            while (System.currentTimeMillis() < end) {
                if (jedis.setnx(lockKey, identifer) == 1) {
                    jedis.expire(lockKey, lockExpire);
                    logger.debug("Redis setNx success : key = " + lockKey + " value = " + identifer);
                    // 返回value值，用于释放锁时间确认
                    retIdentifier = identifer;
                    return retIdentifier;
                }
                // 返回-1代表key没有设置超时时间，为key设置一个超时时间
                if (jedis.ttl(lockKey) == -1) {
                    jedis.expire(lockKey, lockExpire);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
            logger.debug("Redis setNx error :  " + e.getMessage() + " key : " + lockName);
        } finally {
            returnResource(jedis);
        }

        return retIdentifier;
    }

    public boolean releaseLock(String lockName, String identifier) {
        Jedis jedis = null;
        String lockKey = "lock:" + lockName;
        boolean retFlag = false;
        try {
            jedis = jedisPool.getResource();
            while (true) {
                // 监视lock，准备开始事务
                jedis.watch(lockKey);
                // 通过前面返回的value值判断是不是该锁，若是该锁，则删除，释放锁
                if (identifier.equals(jedis.get(lockKey))) {
                    Transaction transaction = jedis.multi();
                    transaction.del(lockKey);
                    List<Object> results = transaction.exec();
                    if (results == null) {
                        continue;
                    }
                    retFlag = true;
                }
                jedis.unwatch();
                break;
            }
        } catch (JedisException e) {
            e.printStackTrace();
            logger.debug("Redis releaseLock error : key = " + lockKey + " value = " + identifier);
        } finally {
            this.returnResource(jedis);
        }
        return retFlag;
    }

    public String get(String key) {
        String result = null;
        Jedis jedis = null;
        try {
            jedis = getResource();
            result = jedis.get(key);
            logger.debug("Redis get success - " + key + ", value:" + result);
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("Redis set error: " + e.getMessage() + " - " + key + ", value:" + result);
        } finally {
            returnResource(jedis);
        }
        return result;
    }

    public List<String> getList(String key, long start, long end) {
        List<String> result = null;
        Jedis jedis = null;
        try {
            jedis = getResource();
            result = jedis.lrange(key, start, end);
            logger.debug("Redis getList success - " + key + ", value:" + result);
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("Redis getList error: " + e.getMessage() + " - " + key + ", value:" + result);
        } finally {
            returnResource(jedis);
        }
        return result;
    }

    public List<String> popAsList(String key) {
        List<String> result = new ArrayList<>();
        Jedis jedis = null;
        try {
            jedis = getResource();
            String t = null;
            do {
                t = jedis.lpop(key);
                if (t != null) result.add(t);
            } while (t != null);
            logger.debug("Redis getList success - " + key + ", value:" + result);
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("Redis getList error: " + e.getMessage() + " - " + key + ", value:" + result);
        } finally {
            returnResource(jedis);
        }
        return result;
    }

    public Long putList(String key, String value) {
        Long result = null;
        Jedis jedis = null;
        try {
            jedis = getResource();
            result = jedis.lpush(key, value);
            logger.debug("Redis putlist success - " + key + ", value:" + value);
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("Redis putlist error: " + e.getMessage() + " - " + key + ", value:" + value);
        } finally {
            returnResource(jedis);
        }
        return result;
    }
}
