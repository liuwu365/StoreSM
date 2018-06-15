package com.yunda.store.common.controller;

import org.springframework.stereotype.Controller;

import com.yunda.store.common.utils.ShiroUtils;
import com.yunda.store.system.domain.UserDO;

@Controller
public class BaseController {
	public UserDO getUser() {
		return ShiroUtils.getUser();
	}

	public Long getUserId() {
		return getUser().getUserId();
	}

	public String getUsername() {
		return getUser().getUsername();
	}
}
