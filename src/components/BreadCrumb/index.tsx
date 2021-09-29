import * as React from 'react';
import { Breadcrumb } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import './index.scss';

interface Props {
  sections: [{ content: string; to?: string }];
}

export default function BreadCrumb(props: Props) {
  // Create array of sections for sementic-ui Breadcrumb component
  const sections = props.sections.map((section: any, i: number) => {
    // Object of props for each <Breadcrumb.Section>
    return {
      key: section.content,
      content: section.content,
      // If "to" specified then it is a link and
      // should be rendered as a React Router link
      link: section.to ? true : false,
      as: section.to ? Link : undefined,
      to: section.to,
      // It is active if the last section
      active: props.sections.length - 1 === i,
    };
  });

  return <Breadcrumb icon="right angle" sections={sections} />;
}
