/**
 * @file simple skeleton
 * @author panyuqi <pyqiverson@gmail.com>
 */

import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import Skeleton from './Skeleton';

let html = ReactDOMServer.renderToStaticMarkup(<Skeleton />);

export default html;
