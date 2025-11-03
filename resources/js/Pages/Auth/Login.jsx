import { Head } from '@inertiajs/react';
export default function Login({ status, canResetPassword }) {
    return (
        <>
            <Head title="Login"/>
            <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-950">
                <div className="w-[600px] bg-white dark-bg rounded-xl shadow-sm p-10">
                    <div className="mb-2">
                        <label htmlFor="user_id" className="form-label">아이디</label>
                        <input type="text" name="user_id" id="user_id" className="form-control"/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="user_id" className="form-label">비밀번호</label>
                        <input type="text" name="user_id" id="user_id" className="form-control"/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="user_id" className="form-label">비밀번호 확인</label>
                        <input type="text" name="user_id" id="user_id" className="form-control"/>
                    </div>
                </div>
            </div>
        </>
    );
}
