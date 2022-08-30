import React from 'react';
import './education.component.scss';
import { Divider } from 'semantic-ui-react';

export const EducationComponent = () => {
  return (
    <div className="education-wrap">
      <div className="ttl">
        <span>Education</span>
        <Divider />
      </div>
      <div className="content-wrap">
        <div className="school-wrap">
          <div className="header">
            <span className="school-name">Central Luzon State University</span>
            <span className="date">Jun 2003 - Mar 2008</span>
          </div>
          <div className="course">
            Bachelor of Science in Information and Technology Munoz, Nueva Ecija, Philippines.
          </div>
        </div>
      </div>
    </div>
  );
};
