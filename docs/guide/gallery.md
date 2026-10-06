# Gallery

The [component styles](/guide/components) applied to the markup of `@zairakai/vue-components`. Switch the theme of the site (the moon at the top right) to see the dark mode: the styles follow `data-theme`.

## Display

<div class="zk-demo vp-raw">
  <div class="card" style="max-inline-size: 22rem">
    <div class="card-header">Card title</div>
    <div class="card-body">The body of the card, on the surface color.</div>
    <div class="card-footer">Footer</div>
  </div>
  <p>
    <span class="badge">New</span>
    <span class="badge" data-variant="success">Done</span>
    <span class="badge" data-variant="warning">Late</span>
    <span class="badge" data-variant="error">Failed</span>
  </p>
  <div class="chip-group">
    <span class="chip" data-selected><button type="button" class="chip-label" aria-pressed="true">Vue</button></span>
    <span class="chip"><button type="button" class="chip-label" aria-pressed="false">Svelte</button></span>
    <span class="chip" data-variant="info"><span class="chip-label">Info</span><button type="button" class="chip-remove" aria-label="Remove">&times;</button></span>
  </div>
  <div class="accordion" style="margin-top: 1rem">
    <details class="accordion-item" open>
      <summary class="accordion-trigger">What is it?</summary>
      <div class="accordion-panel">Panels built on native details elements.</div>
    </details>
    <details class="accordion-item">
      <summary class="accordion-trigger">Is it accessible?</summary>
      <div class="accordion-panel">Yes.</div>
    </details>
  </div>
</div>

## Feedback

<div class="zk-demo vp-raw">
  <div class="alert" data-variant="success" role="status">
    <div class="alert-body"><p class="alert-title">Saved</p>Your changes were saved.</div>
  </div>
  <div class="alert" data-variant="error" role="alert" style="margin-top: 0.5rem">
    <div class="alert-body"><p class="alert-title">Failed</p>Something went wrong.</div>
  </div>
  <p><progress class="progress" max="100" value="60"></progress></p>
  <div class="skeleton" style="inline-size: 60%"></div>
</div>

## Navigation

<div class="zk-demo vp-raw">
  <div class="tabs">
    <div class="tab-list" role="tablist">
      <button type="button" class="tab" role="tab" aria-selected="true">Overview</button>
      <button type="button" class="tab" role="tab" aria-selected="false">Details</button>
    </div>
    <div class="tab-panel" role="tabpanel">The overview.</div>
  </div>
  <nav class="pagination" aria-label="Pagination">
    <a class="pagination-item" href="#">1</a>
    <a class="pagination-item" href="#" aria-current="page">2</a>
    <a class="pagination-item" href="#">3</a>
    <span class="pagination-gap">…</span>
    <a class="pagination-item" href="#">12</a>
  </nav>
  <nav aria-label="Breadcrumb" style="margin-top: 1rem">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="#">Home</a></li>
      <li class="breadcrumb-item"><a href="#">Components</a></li>
      <li class="breadcrumb-item" aria-current="page">Breadcrumb</li>
    </ol>
  </nav>
</div>

## Data and content

<div class="zk-demo vp-raw">
  <table class="data-table">
    <caption>People</caption>
    <thead>
      <tr>
        <th scope="col" aria-sort="ascending"><button type="button" class="data-table-sort">Name</button></th>
        <th scope="col" data-align="end">Age</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Ada</td><td data-align="end">36</td></tr>
      <tr aria-selected="true"><td>Alan</td><td data-align="end">41</td></tr>
      <tr><td>Grace</td><td data-align="end">85</td></tr>
    </tbody>
  </table>
  <p>Press <span class="kbd-combo"><kbd class="kbd-key">Ctrl</kbd><span class="kbd-separator">+</span><kbd class="kbd-key">K</kbd></span> to search, run <code class="code">npm test</code>.</p>
  <div class="callout" data-variant="info"><div><p class="callout-title">Note</p>A highlighted note.</div></div>
</div>

## Form

<div class="zk-demo vp-raw">
  <div class="combobox">
    <label class="combobox-label" for="gallery-fruit">Fruit</label>
    <div class="combobox-control">
      <span class="combobox-chip"><span class="combobox-chip-label">Apple</span><button type="button" class="combobox-chip-remove" aria-label="Remove Apple">&times;</button></span>
      <input id="gallery-fruit" class="combobox-input" type="text" role="combobox" aria-expanded="false" placeholder="Type to filter" />
    </div>
  </div>
  <div class="otp" role="group" aria-label="Code" style="margin-top: 1rem">
    <input class="otp-digit" maxlength="1" value="4" aria-label="Digit 1" />
    <input class="otp-digit" maxlength="1" value="2" aria-label="Digit 2" />
    <input class="otp-digit" maxlength="1" aria-label="Digit 3" />
  </div>
  <div class="theme-switcher" role="group" aria-label="Theme" style="margin-top: 1rem">
    <button type="button" class="theme-switcher-option" aria-pressed="false">Light</button>
    <button type="button" class="theme-switcher-option" aria-pressed="true">Dark</button>
    <button type="button" class="theme-switcher-option" aria-pressed="false">System</button>
  </div>
</div>
