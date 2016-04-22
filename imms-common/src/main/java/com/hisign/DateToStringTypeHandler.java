package com.hisign;

import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;

import java.sql.*;
import java.text.ParseException;
import java.util.Date;

/**
 * 将数据库中的Date转为java中的String类型
 * @author Administrator
 *
 */
public class DateToStringTypeHandler extends BaseTypeHandler<String> {

	@Override
	public void setNonNullParameter(PreparedStatement ps, int i,
			String parameter, JdbcType jdbcType) throws SQLException {
		// TODO Auto-generated method stub
		Date date = null;
		try {
			date = DateUtil.convertStringToDate("yyyy-MM-dd HH:mm:ss", parameter);
			ps.setTimestamp(i, new Timestamp(date.getTime()));
		} catch (ParseException e) {
			try {
				date = DateUtil.convertStringToDate("yyyy-MM-dd", parameter);
				ps.setTimestamp(i, new Timestamp(date.getTime()));
			} catch (ParseException e1) {
				// TODO Auto-generated catch block
				ps.setTimestamp(i, null);
				e.printStackTrace();
			}
		}
		
	}

	@Override
	public String getNullableResult(ResultSet rs, String columnName)
			throws SQLException {
		// TODO Auto-generated method stub
		String sqlTimestamp = rs.getString(columnName);
	    if (sqlTimestamp != null) {
	      return sqlTimestamp;
	    }
	    return null;
	}

	@Override
	public String getNullableResult(ResultSet rs, int columnIndex)
			throws SQLException {
		// TODO Auto-generated method stub
		String sqlTimestamp = rs.getString(columnIndex);
	    if (sqlTimestamp != null) {
	      return sqlTimestamp;
	    }
	    return null;
	}

	@Override
	public String getNullableResult(CallableStatement cs, int columnIndex)
			throws SQLException {
		// TODO Auto-generated method stub
		String sqlTimestamp = cs.getString(columnIndex);
	    if (sqlTimestamp != null) {
	      return sqlTimestamp;
	    }
	    return null;
	}

	 
}