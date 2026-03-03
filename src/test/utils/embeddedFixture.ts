const EMBEDDED_HEAD = `
  <link rel="stylesheet" id="dashicons-css" href="https://example.com/wp-includes/css/dashicons.min.css" />
  <link rel="stylesheet" id="admin-bar-css" href="https://example.com/wp-includes/css/admin-bar.min.css" />
  <link rel="stylesheet" id="mx_0-css" href="https://example.com/bootstrap.min.css" />
  <link rel="stylesheet" id="mx_1-css" href="https://example.com/font-awesome.min.css" />
  <link rel="stylesheet" id="app-styles" data-keep-stylesheet href="https://example.com/emily-app.css" />
`;

const EMBEDDED_BODY = `
  <div id="wrapper" class="container container-fluid">
    <div class="wrapper responsive page-wrapper">
      <div class="nav-bar"></div>
      <div class="wrapper responsive">
        <div class="container">
          <div class="row clearfix">
            <div class="mainbody pageContent col-md-12">
              <main id="emily-realestate" class="relative"></main>
            </div>
          </div>
        </div>
      </div>
      <div class="push-footer"></div>
    </div>
  </div>
  <div class="row footer custom-footer"></div>
`;

export function setupEmbeddedFixture() {
  document.head.innerHTML = EMBEDDED_HEAD;
  document.body.innerHTML = EMBEDDED_BODY;

  const mountNode = document.getElementById('emily-realestate');

  if (!mountNode) {
    throw new Error('Missing #emily-realestate mount element in fixture');
  }

  return {
    mountNode,
  };
}
