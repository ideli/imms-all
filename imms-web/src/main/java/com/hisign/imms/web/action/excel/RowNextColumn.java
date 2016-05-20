package com.hisign.imms.web.action.excel;

import java.util.LinkedList;

/**
 * 存放每一行中下一个cell的位置对象
 * @author wangping
 * @version 1.0
 * @since 2016/3/15
 */
public class RowNextColumn {
    /**
     * 行号
     */
    private int rowIndex = 0;
    /**
     * 一个既可以作为队列（先进先出），也可以作为堆栈（后进先出）使用的链表
     */
    private LinkedList<Integer> nextColIndexList = new LinkedList<Integer>();

    public RowNextColumn(int rowIndex) {
        this.rowIndex = rowIndex;
    }

    /**
     * 在队列最前面插入元素（多个）
     * @param indexs
     */
    public void offBatchArgs(Integer... indexs) {
        for (Integer index : indexs) {
            if (!this.nextColIndexList.contains(index)) {
                this.nextColIndexList.offer(index);
            }
        }
    }

    /**
     * 在堆栈最后插入元素（多个）
     * @param indexs
     */
    public void pushBatchArgs(Integer... indexs) {
        for (Integer index : indexs) {
            if (!this.nextColIndexList.contains(index)) {
                this.nextColIndexList.push(index);
            }
        }
    }

    /**
     * 在队列中批量插入元素（顺序）
     * @param startIndex
     * @param endIndex
     */
    public void offBatch(int startIndex, int endIndex) {
        for (int j = startIndex; j <= endIndex; j++) {
            if (!this.nextColIndexList.contains(j)) {
                this.nextColIndexList.offer(j);
            }
        }
    }

    /**
     * 在堆栈中批量插入元素（顺序）
     * @param startIndex
     * @param endIndex
     */
    public void pushBatch(int startIndex, int endIndex) {
        for (int j = endIndex; j >= startIndex; j--) {
            if (!this.nextColIndexList.contains(j)) {
                this.nextColIndexList.push(j);
            }
        }
    }

    /**
     * 判断在队列中是否存在当前元素
     * @param nextColIndex
     * @return
     */
    public boolean containKey(Integer nextColIndex) {
        return nextColIndexList.contains(nextColIndex);
    }

    /**
     * 弹出最后的元素，并返回对应的值
     * @return
     */
    public Integer popNextColIndex() {
        return nextColIndexList.pollLast();
    }

    /**
     * 弹出最前的元素，并返回对应的值
     * @return
     */
    public Integer pollNextColIndex() {
        return nextColIndexList.pollFirst();
    }

    /**
     * 返回最前面的元素值
     * @return
     */
    public Integer getFirstNextColIndex() {
        Integer nextColIndex = nextColIndexList.peekFirst();
        return nextColIndex;
    }

    /**
     * 返回最后的元素值
     * @return
     */
    public Integer getLastNextColIndex() {
        Integer nextColIndex = nextColIndexList.peekLast();
        return nextColIndex;
    }

}

