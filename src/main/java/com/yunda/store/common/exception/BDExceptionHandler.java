package com.yunda.store.common.exception;

import org.apache.shiro.authz.AuthorizationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.yunda.store.common.utils.R;

/**
 * 异常处理器
 * 
 */
@RestControllerAdvice
public class BDExceptionHandler {
	private static final Logger LOGGER = LoggerFactory.getLogger(BDExceptionHandler.class);

	/**
	 * 自定义异常
	 */
	@ExceptionHandler(BDException.class)
	public R handleBDException(BDException e) {
		R r = new R();
		r.put("code", e.getCode());
		r.put("msg", e.getMessage());

		return r;
	}

	@ExceptionHandler(DuplicateKeyException.class)
	public R handleDuplicateKeyException(DuplicateKeyException e) {
		LOGGER.error(e.getMessage(), e);
		return R.error("数据库中已存在该记录");
	}

	@ExceptionHandler(org.springframework.web.servlet.NoHandlerFoundException.class)
	public R noHandlerFoundException(org.springframework.web.servlet.NoHandlerFoundException e) {
		LOGGER.error(e.getMessage(), e);
		return R.error(404, "没找找到页面");
	}

	@ExceptionHandler(AuthorizationException.class)
	public R handleAuthorizationException(AuthorizationException e) {
		LOGGER.error(e.getMessage(), e);
		return R.error(403, "未授权");
	}

	@ExceptionHandler(Exception.class)
	public R handleException(Exception e) {
		LOGGER.error(e.getMessage(), e);
		return R.error("服务器错误，请联系管理员");
	}
}
