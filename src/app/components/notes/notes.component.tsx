import React from 'react';
import './notes.component.scss';
import { Divider } from 'semantic-ui-react';

export const NotesComponent = () => {
  return (
    <div className="notes-wrap">
      <div className="ttl">
        <span>Notes</span>
        <Divider />
      </div>
      <div className="content-wrap">
        <span>
          References are available upon request and if you have any questions please SMS or email or skype me.
        </span>
      </div>
    </div>
  );
};
