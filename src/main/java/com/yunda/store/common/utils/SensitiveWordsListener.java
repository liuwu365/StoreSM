package com.yunda.store.common.utils;

import com.yunda.store.store.service.ShopService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;

/**
 * 初始加载敏感词
 * 
 * @author LLL
 * @date 2018-04-13
 */
public class SensitiveWordsListener implements InitializingBean {

	private static Logger log = Logger.getLogger(SensitiveWordsListener.class);

	@Autowired
	private ShopService shopService;

	@Override
	public void afterPropertiesSet() throws Exception {
		log.info("启动加载敏感词====start");
		List<Map<String, Object>> sensitiveWords = shopService.getSensitiveWords();
		Map sensitiveWordMap = SensitiveWordInit.initKeyWord(sensitiveWords);
		// 传入SensitivewordEngine类中的敏感词库
		SensitivewordEngine.sensitiveWordMap = sensitiveWordMap;
		log.info("启动加载敏感词====end");

	}
}
