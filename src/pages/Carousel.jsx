import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';

const url = 'http://3.90.3.168:4000/'
const items = [
    {
        src: `${url}image/f1.jpg`,
        altText: 'Slide 1',
        caption: 'Slide 1',
        header: 'Slide 1 Header',
        key: '1'
    },
    {
        src: `${url}image/f2.jpg`,
        altText: 'Slide 2',
        caption: 'Slide 2',
        header: 'Slide 2 Header',
        key: '2'
    },
    {
        src: `${url}image/f3.jpg`,
        altText: 'Slide 3',
        caption: 'Slide 3',
        header: 'Slide 3 Header',
        key: '3'
    }
];

const Example = () => <UncontrolledCarousel items={items} />;

export default Example;