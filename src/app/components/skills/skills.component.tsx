import React from 'react';
import './skills.component.scss';
import { Divider } from 'semantic-ui-react';
import { SkillsModel } from '@models/custom.models';
import { orderBy } from 'lodash';

export const SkillsComponent = (props: { items: SkillsModel[] }) => {
  const sortedItems = orderBy(props.items, ['level', 'name'], ['desc', 'asc']);

  return (
    <div className="skills-wrap">
      <div className="ttl">
        <span>Skills</span>
        <Divider />
      </div>
      <div className="content-wrap">
        {sortedItems.slice(0, 10).map((item) => {
          return (
            <div key={item.name} className="skill-wrap">
              <span className="name">{item.name}</span>
              <div className="lvl-wrap">
                <div className="lvl" style={{ width: `${10 * item.level}%` }}>
                  {`${item.level} / 10`}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="ttl">
        <span>Others</span>
        <Divider />
        <div className="content-wrap">
          <span className="other-skills">
            {sortedItems
              .slice(10)
              .map((item) => item.name)
              .join(', ')}
          </span>
        </div>
      </div>
    </div>
  );
};
