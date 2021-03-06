import React, { ReactNode } from 'react';
import Head from 'next/head';

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'MinerRabbit - Tools' }: Props) => (
  <div className="flex flex-col h-screen justify-between">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div className="bg-indigo-600">
        <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between flex-wrap">
            <div className="w-0 flex-1 flex items-center">
                <span className="flex p-2 rounded-lg bg-indigo-800">
                <svg id="Capa_1" enableBackground="new 0 0 511.046 511.046" height="24" viewBox="0 0 511.046 511.046" width="24" xmlns="http://www.w3.org/2000/svg"><g id="XMLID_162_"><path id="XMLID_1204_" d="m154.266 290.735h100.984v30h-100.984z" fill="#a7d2d7" transform="matrix(.707 -.707 .707 .707 -156.214 234.334)"/><path id="XMLID_1203_" d="m253.837 137.197h208.918v30h-208.918z" fill="#a7d2d7" transform="matrix(.707 -.707 .707 .707 -2.677 297.931)"/><path id="XMLID_67_" d="m259.14 149.999h208.918v15.001h-208.918z" fill="#7ba0b0" transform="matrix(.707 -.707 .707 .707 -4.874 303.232)"/><path id="XMLID_288_" d="m159.569 303.536h100.984v15.001h-100.984z" fill="#7ba0b0" transform="matrix(.707 -.707 .707 .707 -158.411 239.634)"/><path id="XMLID_323_" d="m455.433 488.232-54.012-54.011 48.225-48.226 54.012 54.012c14.316-33.441 7.828-73.678-19.472-100.978-20.891-20.891-46.608-26.855-71.522-21.091-8.32 1.925-27.042 9.314-33.081 3.275l-190.884-190.886c-5.941-5.941 1.43-24.485 3.194-32.699 5.262-24.504-.845-49.688-21.372-70.214-27.3-27.3-67.536-33.788-100.978-19.473l54.012 54.012-48.225 48.225-54.013-54.011c-14.316 33.441-7.828 73.677 19.473 100.978 20.891 20.891 46.608 26.855 71.521 21.091 8.32-1.925 17.042.686 23.081 6.725l190.885 190.885c5.941 5.941 8.57 14.485 6.806 22.699-5.262 24.504.845 49.688 21.372 70.214 27.3 27.3 67.536 33.789 100.978 19.473z" fill="#e4ebef"/><path d="m16.643 493.85c-23.333-23.333-21.95-61.569 3.009-83.155l131.234-107.429 56.341 56.341-107.43 131.235c-21.586 24.958-59.821 26.342-83.154 3.008z" fill="#ff9468"/><path id="XMLID_281_" d="m16.642 493.849.001.001c23.333 23.333 61.569 21.95 83.155-3.009l107.429-131.234-28.172-28.172z" fill="#ff5b5b"/><path d="m427.777 16.372h58.652v71.993h-58.652z" fill="#c7e2e5" transform="matrix(.707 .707 -.707 .707 170.912 -307.882)"/><path id="XMLID_1213_" d="m80.32 451.38-51.65 51.66c-4.3-2.44-8.35-5.51-12.03-9.19s-6.74-7.73-9.19-12.02l51.66-51.66c5.86-5.86 15.36-5.86 21.21 0 5.86 5.86 5.86 15.36 0 21.21z" fill="#ff5b5b"/><path id="XMLID_1210_" d="m175.9 397.88-20.85 25.47-67.9-67.9 25.47-20.85z" fill="#ff5b5b"/><path id="XMLID_2573_" d="m424.807 410.834-324.817-325.317 23.564-23.564-54.012-54.012c33.442-14.316 73.678-7.828 100.978 19.472 20.526 20.527 26.634 45.711 21.372 70.215-1.764 8.214.865 16.758 6.806 22.699l190.885 190.885c6.039 6.039 14.76 8.65 23.081 6.725 24.913-5.764 50.63.2 71.522 21.091 27.3 27.301 33.789 67.537 19.472 100.978l-54.012-54.012z" fill="#c7e2e5"/><path id="XMLID_68_" d="m431.729 48.689h71.993v28.605h-71.993z" fill="#a7d2d7" transform="matrix(.707 -.707 .707 .707 92.453 349.183)"/><g fill="#ff193d"><path id="XMLID_285_" d="m16.64 493.85c3.68 3.68 7.73 6.75 12.03 9.19l51.65-51.66c5.86-5.85 5.86-15.35 0-21.21z"/><path id="XMLID_315_" d="m121.095 389.395 33.955 33.955 20.85-25.47-31.645-31.645z"/></g></g></svg>
                </span>
                <p className="ml-3 font-medium text-white truncate">
                <span className="hidden md:inline">
                    Tools
                </span>
                </p>
            </div>
            <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                <a href="#" className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50">
                MinerRabbit
                </a>
            </div>
        </div>
    </div>
  </div>
  <main className="mb-auto">{children}</main>
  <footer className="footer bg-white relative pt-1 border-b-2 border-blue-700">
      <div className="container mx-auto px-6 ">
          <div className="mt-16 border-t-2 border-gray-300 flex flex-col items-center">
              <div className="sm:w-2/3 text-center py-6">
                  <p className="text-sm text-blue-700 font-bold mb-2">
                      © 2020 by MinerRabbit
                  </p>
              </div>
          </div>
      </div>
  </footer>
</div>
)

export default Layout
