import React from 'react';
import './work-experiences.component.scss';
import { Divider } from 'semantic-ui-react';
import { WorkExperiencesModel } from '@models/custom.models';

export const WorkExperiencesComponent = (props: { items: WorkExperiencesModel[] }) => {
  return (
    <div className="work-experiences-wrap">
      <div className="ttl">
        <span>Work Experiences</span>
        <Divider />
      </div>
      <div className="content-wrap">
        {props.items.map((item) => {
          return (
            <div key={item.company} className="work-wrap">
              <div className="block" />
              <div className="header">
                <span className="company-name">{item.company}</span>
                <span className="date">{item.duration}</span>
              </div>
              <div className="position">{item.position}</div>
              <div className="job-desc" dangerouslySetInnerHTML={{ __html: item.jobDescription }} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
