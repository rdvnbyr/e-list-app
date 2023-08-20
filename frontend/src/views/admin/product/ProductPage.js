import PropTypes from 'prop-types';

export function ProductPage({color}) {
  return (
    <>
      <div
        className={
          'relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded px-4 overflow-hidden ' +
          (color === 'light' ? 'bg-white' : 'bg-lightBlue-900 text-white')
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  'font-semibold text-lg ' +
                  (color === 'light' ? 'text-blueGray-700' : 'text-white')
                }
              >
                Card Tables
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto"></div>
      </div>
    </>
  );
}

ProductPage.defaultProps = {
  color: 'light',
};

ProductPage.propTypes = {
  color: PropTypes.oneOf(['light', 'dark']),
};
