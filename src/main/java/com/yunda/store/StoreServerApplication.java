package com.yunda.store;

import org.mybatis.spring.annotation.MapperScan;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@EnableTransactionManagement
@ServletComponentScan
@MapperScan("com.yunda.store.*.dao")
@SpringBootApplication
public class StoreServerApplication {
    private static final Logger LOGGER = LoggerFactory.getLogger(StoreServerApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(StoreServerApplication.class, args);
        LOGGER.info("ヾ(◍°∇°◍)ﾉﾞ    yunda.store启动成功      ヾ(◍°∇°◍)ﾉﾞ\n");
    }

}
