import React from 'react';
import './contacts.component.scss';
import { Icon, SemanticICONS } from 'semantic-ui-react';
import { ContactsModel } from '@models/custom.models';

export const ContactsComponent = (props: { items: ContactsModel[] }) => {
  return (
    <div className="contacts-wrap">
      {props.items.map((item) => {
        return (
          <div key={item.text}>
            <span>{item.text}</span>
            <Icon name={item.icon as SemanticICONS} />
          </div>
        );
      })}
    </div>
  );
};
