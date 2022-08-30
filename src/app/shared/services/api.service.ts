import { ajax } from 'rxjs/internal/ajax/ajax';
import { Buffer } from 'buffer';
import { Host } from '@models/env';
import { map } from 'rxjs';
import { Store } from '@services/store.service';
import { DataModel } from '@models/custom.models';

class ApiService {
  getMainRepoHash() {
    const url = Host.MainRepo;
    return ajax
      .getJSON<{ target: { hash: string } }>(url, {
        authorization: `Basic ${Buffer.from(Host.PersonalAccessToken, 'utf8').toString('base64')}`,
      })
      .pipe(
        map((res) => {
          Store.Hash = res.target.hash;
          return res.target.hash;
        })
      );
  }

  getDataJson() {
    const url = `${Host.MainRepoSrc}/${Store.Hash}/src/assets/data/data.json`;
    return ajax.getJSON<DataModel>(url, {
      authorization: `Basic ${Buffer.from(Host.PersonalAccessToken, 'utf8').toString('base64')}`,
    });
  }
}

export const API = new ApiService();
/*
curl $'https://bitbucket.org/\u0021api/2.0/repositories/janbee-angeles/janbee-angeles.bitbucket.io/refs/branches/master' \
  -H 'authority: bitbucket.org' \
  -H 'Authorization: Basic amFuYmVlYW5nZWxlczpBVEJCdlF0WnhZckE3UUNIeXZMSEtKY2JTdEF6OEIxOTlFQkU=' \
  --compressed
* */
