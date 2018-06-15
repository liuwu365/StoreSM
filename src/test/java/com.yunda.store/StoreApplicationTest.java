package com.yunda.store;

import com.yunda.store.common.redis.RedisClient;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
public class StoreApplicationTest {
    @Autowired
    RedisClient redisClient;


    @Test
    public void test() {
        redisClient.set("abc", "eeeeeeeeeeeeeeeeeeeeeeeeee");
        System.out.println(redisClient.get("abc"));

    }



}