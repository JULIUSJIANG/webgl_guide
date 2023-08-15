import React from 'react';
import {Button} from 'antd';
import {createRoot} from 'react-dom/client';

const NodeModules = {
    react: React,
    antd: {Button},
    createRoot: createRoot,
};

export default NodeModules;