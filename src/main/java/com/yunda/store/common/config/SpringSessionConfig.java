package com.yunda.store.common.config;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;

@ConditionalOnProperty(prefix = "store", name = "spring-session-open", havingValue = "true")
public class SpringSessionConfig {

}
