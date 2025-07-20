export default function ContactModal() {
  return (
    <div className="absolute top-[calc(100%+1rem)] right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-3 z-50">
      <div className="px-4 py-2 border-b border-gray-100">
        <p className="text-sm font-medium text-gray-900">Quick Contact</p>
        <p className="text-xs text-gray-500 mt-1">We're here to help!</p>
      </div>

      <div className="py-2">
        <a
          href="https://www.linkedin.com/in/tarekmonowar/" // <-- change to your actual LinkedIn URL
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <svg
            className="w-4 h-4 text-[#0A66C2]"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8.98h5V24H0V8.98zm7.5 0h4.78v2.12h.07c.67-1.27 2.3-2.61 4.73-2.61 5.06 0 5.99 3.33 5.99 7.66V24H18v-6.66c0-1.59-.03-3.63-2.21-3.63-2.22 0-2.56 1.73-2.56 3.51V24h-5V8.98z" />
          </svg>
          <div>
            <p className="font-medium">LinkedIn</p>
            <p className="text-xs text-gray-500">@tmonowar</p>
          </div>
        </a>

        <a
          href="https://www.facebook.com/tarekmonowar53"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
        >
          <svg
            className="w-4 h-4 text-[#0084FF]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.908 1.438 5.504 3.686 7.205V22l3.371-1.85c.93.258 1.914.397 2.943.397 5.523 0 10-4.145 10-9.243C22 6.145 17.523 2 12 2zm1.09 12.409l-2.52-2.688-4.92 2.688 5.4-5.744 2.58 2.688 4.86-2.688-5.4 5.744z" />
          </svg>
          <div>
            <p className="font-medium">Messenger</p>
            <p className="text-xs text-gray-500">Chat on Facebook</p>
          </div>
        </a>
        {/* <a
          href="https://wa.me/+9777676676"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          <svg
            className="w-4 h-4 text-[#25D366]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.964 9.964 0 001.333 4.993L2 22l5.233-1.237a9.994 9.994 0 004.779 1.217h.004c5.505 0 9.988-4.478 9.988-9.984 0-2.669-1.037-5.176-2.922-7.062A9.935 9.935 0 0012.012 2zm-3.97 14.256l-2.345-.673 2.325-3.81 2.345.673-2.325 3.81zm9.924-4.27c-.215.335-1.33.81-1.874.922-.543.112-1.235.155-1.993-.155-.758-.31-1.484-.758-2.294-1.568s-1.257-1.536-1.567-2.294c-.31-.758-.268-1.45-.156-1.993.112-.543.587-1.659.922-1.874.335-.215.71-.129.963.039.254.168.547.465.797.715.25.25.504.543.672.797.168.254.254.63.039.964-.215.335-.672.923-.672.923s.168.758.923 1.513c.755.755 1.513.923 1.513.923s.587-.458.922-.673c.335-.215.71-.129.964.039.254.168.547.465.797.715.25.25.504.543.672.797.168.254.174.63-.041.964z" />
          </svg>
          <div>
            <p className="font-medium">WhatsApp</p>
            <p className="text-xs text-gray-500">+01777771101</p>
          </div>
        </a> */}
        <a
          href="https://mail.google.com/mail/?view=cm&to=tarekmonowar2332@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <svg
            className="w-4 h-4 text-[#EA4335]" // Gmail red
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 4H4C2.897 4 2 4.897 2 6v12c0 1.103 0.897 2 2 2h16c1.103 0 2-0.897 2-2V6c0-1.103-0.897-2-2-2zm0 2v0.511l-8 5.333-8-5.333V6h16zM4 18V8.489l8 5.333 8-5.333V18H4z" />
          </svg>
          <div>
            <p className="font-medium">Email</p>
            <p className="text-xs text-gray-500">tarekmonowar2332@gmail.com</p>
          </div>
        </a>
      </div>
    </div>
  );
}
