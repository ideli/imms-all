package com.hisign.imms.persist.mapper.sys;

import java.util.List;
import com.hisign.imms.model.sys.Dlyhgl;
import com.hisign.imms.model.sys.DlyhglFilter;

/**
 * Created by Jiang on 2016/5/26.
 */
public interface DlyhglMapper {
    List<Dlyhgl> findDLyhglListByFilter(DlyhglFilter dlyhgl);

    int findDLyhglListByFilterForCount(DlyhglFilter dlyhgl);

    Dlyhgl getDlyhglxxByModel(Dlyhgl dlyhgl);
}
