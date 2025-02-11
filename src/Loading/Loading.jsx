import ReactLoading from 'react-loading'

const Loading = ({text}) => {
    return (
        <div className="md:w-[90%] mx-auto mt-9">
            {
                text.length && <h2 className='text-3xl font-bold mb-5 dark:text-white'>{text}</h2>
            }
            <div className="min-h-screen flex flex-col items-center justify-center">
                <div className="text-2xl font-bold text-blue-600 animate__animated animate__fadeIn animate__slower">
                    <ReactLoading type="spin" color="red" />
                </div>
            </div>
        </div>
    );
};

export default Loading;
