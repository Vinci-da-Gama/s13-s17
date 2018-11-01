import React from 'react';

import AppNavBarCompo from './navbar';
import PageTitleCompo from './page-title';

export default () => (
    <div>
        <AppNavBarCompo />
        <PageTitleCompo pathName={window.location.pathname.replace(/\//g, '')} />
    </div>
);
