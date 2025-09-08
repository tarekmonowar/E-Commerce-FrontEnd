export default function TopFooter() {
  return (
    <div className="bg-[#F3F9F1]">
      <div className="container max-w-6xl mx-auto px-4 grid grid-cols-3 md:grid-cols-5 gap-5">
        {/* 1 */}
        <div className="h-40 md:h-52  flex flex-col justify-center items-center group">
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 32 32"
            className="text-[40px] md:text-[60px] transition-all text-gray-600 duration-300 group-hover:text-[#2C742F] group-hover:scale-105 group-hover:-translate-y-1 mb-2"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M 0 6 L 0 8 L 19 8 L 19 23 L 12.84375 23 C 12.398438 21.28125 10.851563 20 9 20 C 7.148438 20 5.601563 21.28125 5.15625 23 L 4 23 L 4 18 L 2 18 L 2 25 L 5.15625 25 C 5.601563 26.71875 7.148438 28 9 28 C 10.851563 28 12.398438 26.71875 12.84375 25 L 21.15625 25 C 21.601563 26.71875 23.148438 28 25 28 C 26.851563 28 28.398438 26.71875 28.84375 25 L 32 25 L 32 16.84375 L 31.9375 16.6875 L 29.9375 10.6875 L 29.71875 10 L 21 10 L 21 6 Z M 1 10 L 1 12 L 10 12 L 10 10 Z M 21 12 L 28.28125 12 L 30 17.125 L 30 23 L 28.84375 23 C 28.398438 21.28125 26.851563 20 25 20 C 23.148438 20 21.601563 21.28125 21.15625 23 L 21 23 Z M 2 14 L 2 16 L 8 16 L 8 14 Z M 9 22 C 10.117188 22 11 22.882813 11 24 C 11 25.117188 10.117188 26 9 26 C 7.882813 26 7 25.117188 7 24 C 7 22.882813 7.882813 22 9 22 Z M 25 22 C 26.117188 22 27 22.882813 27 24 C 27 25.117188 26.117188 26 25 26 C 23.882813 26 23 25.117188 23 24 C 23 22.882813 23.882813 22 25 22 Z"></path>
          </svg>
          <h2 className="text-[16px] md:text-[20px] font-semibold text-black my-2">
            Free Shipping
          </h2>
          <p className="text-gray-800 text-[12px] md:text-sm">
            For all Orders Over $100
          </p>
        </div>

        {/* 2 */}

        <div className="h-40 md:h-52 flex flex-col justify-center items-center group">
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 256 256"
            className="text-[40px] md:text-[60px] transition-all text-gray-600 duration-300 group-hover:text-[#2C742F] group-hover:scale-105 group-hover:-translate-y-1 mb-2"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M182,104v32a6,6,0,0,1-6,6H94.48l13.76,13.76a6,6,0,1,1-8.48,8.48l-24-24a6,6,0,0,1,0-8.48l24-24a6,6,0,0,1,8.48,8.48L94.48,130H170V104a6,6,0,0,1,12,0Zm48-48V200a14,14,0,0,1-14,14H40a14,14,0,0,1-14-14V56A14,14,0,0,1,40,42H216A14,14,0,0,1,230,56Zm-12,0a2,2,0,0,0-2-2H40a2,2,0,0,0-2,2V200a2,2,0,0,0,2,2H216a2,2,0,0,0,2-2Z"></path>
          </svg>
          <h2 className="text-[16px] md:text-[20px] font-semibold text-black my-2">
            30 Days Returns
          </h2>
          <p className="text-gray-800 text-[12px] md:text-sm">
            For an Exchange Product
          </p>
        </div>

        {/* 3 */}

        <div className="h-40 md:h-52 flex flex-col justify-center items-center group">
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 16 16"
            className="text-[40px] md:text-[60px] transition-all text-gray-600 duration-300 group-hover:text-[#2C742F] group-hover:scale-105 group-hover:-translate-y-1 mb-2"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z"></path>
          </svg>
          <h2 className="text-[16px] md:text-[20px] font-semibold text-black my-2">
            Secured Payment
          </h2>
          <p className="text-gray-800 text-[12px] md:text-sm">
            Payment Cards Accepted
          </p>
        </div>

        {/* 4 */}

        <div className="h-40 md:h-52 flex flex-col justify-center items-center group">
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 32 32"
            className="text-[40px] md:text-[60px] transition-all text-gray-600 duration-300 group-hover:text-[#2C742F] group-hover:scale-105 group-hover:-translate-y-1 mb-2"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M 12 5 C 10.355469 5 9 6.355469 9 8 C 9 8.351563 9.074219 8.683594 9.1875 9 L 4 9 L 4 15 L 5 15 L 5 28 L 27 28 L 27 15 L 28 15 L 28 9 L 22.8125 9 C 22.925781 8.683594 23 8.351563 23 8 C 23 6.355469 21.644531 5 20 5 C 18.25 5 17.0625 6.328125 16.28125 7.4375 C 16.175781 7.585938 16.09375 7.730469 16 7.875 C 15.90625 7.730469 15.824219 7.585938 15.71875 7.4375 C 14.9375 6.328125 13.75 5 12 5 Z M 12 7 C 12.625 7 13.4375 7.671875 14.0625 8.5625 C 14.214844 8.78125 14.191406 8.792969 14.3125 9 L 12 9 C 11.433594 9 11 8.566406 11 8 C 11 7.433594 11.433594 7 12 7 Z M 20 7 C 20.566406 7 21 7.433594 21 8 C 21 8.566406 20.566406 9 20 9 L 17.6875 9 C 17.808594 8.792969 17.785156 8.78125 17.9375 8.5625 C 18.5625 7.671875 19.375 7 20 7 Z M 6 11 L 26 11 L 26 13 L 17 13 L 17 12 L 15 12 L 15 13 L 6 13 Z M 7 15 L 25 15 L 25 26 L 17 26 L 17 16 L 15 16 L 15 26 L 7 26 Z"></path>
          </svg>
          <h2 className="text-[16px] md:text-[20px] font-semibold text-black my-2">
            Special Gifts
          </h2>
          <p className="text-gray-800 text-[12px] md:text-sm">
            Our First Product Order
          </p>
        </div>

        {/* 5 */}

        <div className="h-40 md:h-52 flex flex-col justify-center items-center group ">
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 24 24"
            className="text-[40px] md:text-[60px] transition-all text-gray-600 duration-300 group-hover:text-[#2C742F] group-hover:scale-105 group-hover:-translate-y-1 mb-2"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2C6.486 2 2 6.486 2 12v4.143C2 17.167 2.897 18 4 18h1a1 1 0 0 0 1-1v-5.143a1 1 0 0 0-1-1h-.908C4.648 6.987 7.978 4 12 4s7.352 2.987 7.908 6.857H19a1 1 0 0 0-1 1V18c0 1.103-.897 2-2 2h-2v-1h-4v3h6c2.206 0 4-1.794 4-4 1.103 0 2-.833 2-1.857V12c0-5.514-4.486-10-10-10z"></path>
          </svg>
          <h2 className="text-[16px] md:text-[20px] font-semibold text-black my-2 ">
            Support 24/7
          </h2>
          <p className="text-gray-800 text-[12px] md:text-sm">
            Contact us Anytime
          </p>
        </div>
      </div>
    </div>
  );
}
