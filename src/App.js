import React from 'react';
import TabsBlock from './components/tabs-block';
import NotFound from './components/not-found';
import tabsResponse from './data/tab-response.json';

function App() {
  const showBlocks = Math.random() > 0.15;
  return (
    <div className="app-container">
      {
        showBlocks
        ? <TabsBlock data={tabsResponse.data} />
        : <NotFound />
      }
    </div>
  );
}

export default App;
