// 날짜 정규화 유틸리티 함수들
export const DateUtils = {
    // 날짜를 하루의 시작(00:00:00.000)으로 정규화
    toStartOfDay: (date: Date | null): Date | null => {
        if (!date) return null;
        return new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            0, 0, 0, 0
        );
    },

    // 날짜를 하루의 끝(23:59:59.999)으로 정규화
    toEndOfDay: (date: Date | null): Date | null => {
        if (!date) return null;
        return new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            23, 59, 59, 999
        );
    },

    // 날짜를 분 단위로 정규화 (초/밀리초 제거)
    toMinute: (date: Date | null): Date | null => {
        if (!date) return null;
        return new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            0, 0
        );
    },

    // 두 날짜의 범위 체크 (분 단위)
    isInRangeByMinute: (
        cellTime: number,
        startAt: Date | null,
        endAt: Date | null
    ): boolean => {
        if (!startAt || !endAt) return false;

        const start = DateUtils.toMinute(startAt)?.getTime() ?? null;
        const end = DateUtils.toMinute(endAt)?.getTime() ?? null;

        if (start === null || end === null) return false;

        const min = Math.min(start, end);
        const max = Math.max(start, end);

        return cellTime >= min && cellTime <= max;
    },

    // 두 날짜의 범위 체크 (일 단위)
    isInRangeByDay: (
        cellTime: number,
        startAt: Date | null,
        endAt: Date | null
    ): boolean => {
        if (!startAt || !endAt) return false;

        const start = DateUtils.toStartOfDay(startAt)?.getTime() ?? null;
        const end = DateUtils.toStartOfDay(endAt)?.getTime() ?? null;

        if (start === null || end === null) return false;

        const min = Math.min(start, end);
        const max = Math.max(start, end);

        return cellTime >= min && cellTime <= max;
    }
};
