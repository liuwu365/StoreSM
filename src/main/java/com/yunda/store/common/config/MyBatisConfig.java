package com.yunda.store.common.config;

import com.yunda.store.common.utils.SqlInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


/**
 * @author liuwu
 */
@Configuration
public class MyBatisConfig {

    @Bean
    public SqlInterceptor sqlInterceptor(){
        SqlInterceptor sqlInterceptor = new SqlInterceptor();
        return  sqlInterceptor;
    }

}