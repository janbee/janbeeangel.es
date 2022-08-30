import React from 'react';
import './profile.component.scss';

interface Props {
  name: string;
  intro: string;
}
export const ProfileComponent = (props: Props) => {
  return (
    <div className="profile-wrap">
      <div className="name">{props.name}</div>
      <div className="intro">
        <span className="quote">&#8220;</span>
        <span className="text" dangerouslySetInnerHTML={{ __html: props.intro }} />
        <span className="quote">&#8221;</span>
      </div>
    </div>
  );
};
