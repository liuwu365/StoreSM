package com.yunda.store.common.utils;

import java.io.UnsupportedEncodingException;
import java.text.DecimalFormat;

public class StringUtil {
	
	private StringUtil() {
		super();
	}

	public static final String replace(String line, String oldString, String newString) {
		if (line == null) {
			return null;
		}
		return line.replaceAll(oldString, newString);
	}

	public static String htmlFormat(String str) {
		if (str == null) {
			return "";
		}
		str = replace(str, "<", "&lt;");
		str = replace(str, ">", "&gt;");
		str = replace(str, "\r\n", "<br>");
		str = replace(str, "\"", "&quot;");
		str = replace(str, "\"", "&apos;");
		return str.trim();
	}

	public static String replaceNull(Integer str) {
		return replaceNull(str, false);
	}

	public static String replaceNull(Integer str, boolean hiddenZero) {
		if (str == null) {
			return "";
		}
		if (hiddenZero && str.intValue() == 0) {
			return "";
		}
		return String.valueOf(str);
	}

	public static String replaceNull(Double str) {
		return replaceNull(str, false);
	}

	public static String replaceNull(Double str, boolean hiddenZero) {
		if (str == null) {
			return "";
		}
		if (hiddenZero && str.doubleValue() == 0) {
			return "";
		}
		return (new DecimalFormat("0.00")).format(str);
	}

	public static String replaceNull(Float str) {
		return replaceNull(str, false);
	}

	public static String replaceNull(Float str, boolean hiddenZero) {
		if (str == null) {
			return "";
		}
		if (hiddenZero && str.floatValue() == 0) {
			return "";
		}
		return (new DecimalFormat("0.0")).format(str);
	}

	public static String replaceNull(String str) {
		return replaceNull(str, "");
	}

	public static String replaceNull(String str1, String str2) {
		if (str1 == null) {
			return str2;
		}
		return str1;
	}

	public static String getFormatTime(String time) {
		if (time == null || "".equals(time)) {
			return "";
		}
		StringBuffer sb = new StringBuffer();
		sb.append(time.substring(0, 4)).append("/");
		sb.append(time.substring(4, 6)).append("/");
		sb.append(time.substring(6, 8)).append(" ");
		sb.append(time.substring(8, 10)).append(":");
		sb.append(time.substring(10, 12));
		return sb.toString();
	}

	public static String getBreakLineStr(String str, int lineLen) {
		if (str == null || "".equals(str)) {
			return "";
		}
		str = htmlFormat(str);
		StringBuffer sb = new StringBuffer();
		int beginIndex = 0;
		int endIndex = 0;
		for (int i = 0; i < str.length(); i = i + lineLen) {
			if (i + lineLen < str.length()) {
				endIndex = i + lineLen;
			} else {
				endIndex = str.length();
			}
			sb.append(str.substring(beginIndex, endIndex)).append("<br/>");
			beginIndex = endIndex;
		}
		return sb.toString();
	}

	public static String number2String(int i) {
		return new DecimalFormat("0000").format(i);
	}

	public static String number2String(float i) {
		return new DecimalFormat("0000").format(i);
	}

	public static String number2String(double i) {
		return new DecimalFormat("0000").format(i);
	}

	// 验证字符串是否为空
	public static boolean isNullStr(String str) {
		return str == null || str.trim().length() == 0 || "null".equals(str);
	}

	public static boolean isNotNullStr(String str) {
		return str != null && str.trim().length() > 0;
	}

	// 转换String[]为 String 字符串
	public static String switchArrToStr(String[] arr) {
		String result = "";
		if (arr != null && arr.length > 0) {
			for (int i = 0; i < arr.length; i++) {
				result += arr[i] + ",";
			}
			if (result.indexOf(",") != -1) {
				result = result.substring(0, result.length() - 1);
			}
		}
		return result;
	}

	/**
	 * 转换为字节数组
	 * 
	 * @param str
	 * @return
	 */
	public static byte[] getBytes(String str) {
		if (str != null) {
			try {
				return str.getBytes("UTF-8");
			} catch (UnsupportedEncodingException e) {
				return null;
			}
		} else {
			return null;
		}
	}
}
