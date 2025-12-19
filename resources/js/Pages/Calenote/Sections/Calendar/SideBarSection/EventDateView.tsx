import FormInput from "../../../../../Components/Elements/FormInput";

interface EventDateViewProps {
    startAt: Date | null;
    endAt: Date | null;
}

export default function EventDateView({ startAt, endAt }:EventDateViewProps) {
    const leftDate =
        startAt && endAt
            ? new Date(Math.min(startAt.getTime(), endAt.getTime()))
            : null;

    const rightDate =
        startAt && endAt
            ? new Date(Math.max(startAt.getTime(), endAt.getTime()))
            : null;

    return (
        <div className="pt-17 px-5 flex-wrap">
            <div className="flex">
                <input type="text" className="border-0 bg-transparent outline-none max-w-1/2" value="11"/>
                <input type="text" className="border-0 bg-transparent outline-none max-w-1/2" value="11"/>
            </div>

            <div className="flex">
                <input type="text" className="border-0 bg-transparent outline-none max-w-1/2" value="11"/>
                <input type="text" className="border-0 bg-transparent outline-none max-w-1/2" value="11"/>
            </div>
            {/*여기까지*/}

            {/*<div className="w-full text-xs flex justify-between items-center font-semibold">*/}
            {/*    {(leftDate && rightDate) && (*/}
            {/*        <>*/}
            {/*            <p>*/}
            {/*                {leftDate.getFullYear()}-*/}
            {/*                {leftDate.getMonth() + 1}-*/}
            {/*                {leftDate.getDate()}*/}
            {/*            </p>*/}

            {/*            <p>*/}
            {/*                {rightDate.getFullYear()}-*/}
            {/*                {rightDate.getMonth() + 1}-*/}
            {/*                {rightDate.getDate()}*/}
            {/*            </p>*/}
            {/*        </>*/}
            {/*    )}*/}
            {/*</div>*/}

            {/*<div className="w-full text-xs font-semibold flex justify-between items-center ">*/}
            {/*    {(leftDate && rightDate) && (() => {*/}
            {/*        const leftTime = leftDate.toLocaleTimeString("ko-KR", {*/}
            {/*            hour: "2-digit",*/}
            {/*            minute: "2-digit",*/}
            {/*            hour12: false,*/}
            {/*        });*/}

            {/*        const rightTime = rightDate.toLocaleTimeString("ko-KR", {*/}
            {/*            hour: "2-digit",*/}
            {/*            minute: "2-digit",*/}
            {/*            hour12: false,*/}
            {/*        });*/}

            {/*        return (*/}
            {/*            <>*/}
            {/*                <p>{leftTime}</p>*/}
            {/*                <p>{rightTime}</p>*/}
            {/*            </>*/}
            {/*        );*/}
            {/*    })()}*/}
            {/*</div>*/}
        </div>
    );
}
