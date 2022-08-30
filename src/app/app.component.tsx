import React, { useEffect, useState } from 'react';
import { AppRoutingComponent } from '@app/app-routing.component';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '@app/shared/component/error-fallback';
import useFontFaceObserver from 'use-font-face-observer';
import { LoaderComponent } from '@utilities/loader.component';
import { API } from '@services/api.service';
import { Store } from '@services/store.service';

class State {
  loading = true;
  loaded = false;
}
export const AppComponent = () => {
  const [state, setState] = useState(new State());
  useEffect(() => {
    const obs$ = API.getMainRepoHash().subscribe(() => {
      setState((prevState) => ({ ...prevState, loaded: true }));
    });

    const loader$ = Store.Loading$.subscribe((loading) => {
      setState((prevState) => ({ ...prevState, loading }));
    });
    return () => {
      obs$.unsubscribe();
      loader$.unsubscribe();
    };
  }, []);

  const webFontsLoaded = useFontFaceObserver([{ family: `quicksand` }]);

  console.log('AppComponent ------------------------------------- render');
  return (
    <div className="container">
      <LoaderComponent loading={!webFontsLoaded || state.loading} />
      {webFontsLoaded && state.loaded && (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <AppRoutingComponent />
        </ErrorBoundary>
      )}
    </div>
  );
};
