package com.yunda.store.common.service.impl;

import java.io.File;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.yunda.store.common.config.AutoBaseConfig;
import com.yunda.store.common.dao.FileDao;
import com.yunda.store.common.domain.FileDO;
import com.yunda.store.common.service.FileService;

@Service
public class FileServiceImpl implements FileService {
	@Autowired
	private FileDao sysFileMapper;

	@Autowired
	private AutoBaseConfig autoBaseConfig;

	@Override
	public FileDO get(Long id) {
		return sysFileMapper.get(id);
	}

	@Override
	public List<FileDO> list(Map<String, Object> map) {
		List<FileDO> list = sysFileMapper.list(map);
		if (list.isEmpty()) {
			for (int i = 0; i < list.size(); i++) {
				FileDO file = list.get(i);
				file.setUrl(autoBaseConfig.getUploadLocal() + file.getUrl());
			}
		}
		return list;
	}

	@Override
	public int count(Map<String, Object> map) {
		return sysFileMapper.count(map);
	}

	@Override
	public int save(FileDO sysFile) {
		return sysFileMapper.save(sysFile);
	}

	@Override
	public int update(FileDO sysFile) {
		return sysFileMapper.update(sysFile);
	}

	@Override
	public int remove(Long id) {
		return sysFileMapper.remove(id);
	}

	@Override
	public int batchRemove(Long[] ids) {
		return sysFileMapper.batchRemove(ids);
	}

	@Override
	public Boolean isExist(String url) {
		Boolean isExist = false;
		if (!StringUtils.isEmpty(url)) {
			String filePath = url.replace("/files/", "");
			filePath = autoBaseConfig.getUploadPath() + filePath;
			File file = new File(filePath);
			if (file.exists()) {
				isExist = true;
			}
		}
		return isExist;
	}
}
