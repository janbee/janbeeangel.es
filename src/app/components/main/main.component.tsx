import React, { memo, useCallback, useEffect } from 'react';
import './main.component.scss';
import { Card, Divider, Icon, Menu } from 'semantic-ui-react';
import { ProfileComponent } from '@components/profile/profile.component';
import { ContactsComponent } from '@components/contacts/contacts.component';
import { WorkExperiencesComponent } from '@components/work-experiences/work-experiences.component';
import { SkillsComponent } from '@components/skills/skills.component';
import { API } from '@services/api.service';
import { DataModel } from '@models/custom.models';
import { EducationComponent } from '@components/education/education.component';
import { NotesComponent } from '@components/notes/notes.component';
import { Store } from '@services/store.service';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import packageJson from '../../../../package.json';
import { useApi } from '@utilities/utils';

export const MainComponent = memo(() => {
  const state = useApi<DataModel>(API.getDataJson());

  console.log('gaga-------------------------------------', state);

  useEffect(() => {
    if (state.loading) {
      Store.Loading$.next(true);
    } else if (!state.loading) {
      Store.Loading$.next(false);
    }
  }, [state]);

  const download = useCallback((type: string) => {
    return () => {
      Store.Loading$.next(true);
      const elem = document.querySelector('.card-wrap') as HTMLElement;
      elem.classList.add('fixed-style');

      html2canvas(elem).then((canvas) => {
        Store.Loading$.next(false);
        const imgData = canvas.toDataURL('image/png');

        elem.classList.remove('fixed-style');

        if (type === 'pdf') {
          const doc = new jsPDF('p', 'mm', 'a4');

          const width = doc.internal.pageSize.getWidth();
          const height = doc.internal.pageSize.getHeight();
          doc.addImage(imgData, 'PNG', 0, 0, width, height, undefined, 'FAST');

          doc.save('janbee.' + type);
        } else {
          const downloadLink = document.createElement('a');
          downloadLink.setAttribute('download', 'janbee.' + type);

          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              downloadLink.setAttribute('href', url);
              downloadLink.click();
            }
          });
        }
      });
    };
  }, []);

  if (!state.data) return null;

  return (
    <div className="main-wrap">
      {!state.loading && (
        <>
          <div className="left-wing"></div>
          <Card className="card-wrap">
            <div className="header-wrap">
              <div className="left-wrap">
                <ProfileComponent name={state.data.name} intro={state.data.intro} />
              </div>
              <div className="right-wrap">
                <ContactsComponent items={state.data.contacts} />
              </div>
            </div>
            <Divider />
            <div className="content-wrap">
              <div className="left-wrap">
                <WorkExperiencesComponent items={state.data.workExperiences} />
              </div>
              <div className="right-wrap">
                <SkillsComponent items={state.data.skills} />
                <EducationComponent />
                <NotesComponent />
              </div>
            </div>
          </Card>
          <div className="right-wing">
            <div className="download-wrap">
              <Menu icon="labeled" vertical>
                <div style={{ paddingTop: 10, paddingBottom: 10 }}>
                  <span>Download</span>
                  <span className="version">{`(v${packageJson.version})`}</span>
                </div>
                <Menu.Item name="pdf" onClick={download('pdf')}>
                  <Icon name="file pdf" style={{ color: '#940505' }} />
                  pdf
                </Menu.Item>

                <Menu.Item name="png" onClick={download('png')}>
                  <Icon name="image" style={{ color: '#000b92' }} />
                  png
                </Menu.Item>

                <Menu.Item name="jpeg" onClick={download('jpeg')}>
                  <Icon name="file image" />
                  jpeg
                </Menu.Item>
              </Menu>
            </div>
          </div>
        </>
      )}
    </div>
  );
});
