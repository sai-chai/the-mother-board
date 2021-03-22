Let me start by saying this is definitely not an ideal implementation as I was optimizing for rapid prototyping. Had I more time, I would've optimized for performance and used client-side data fetching. It would've also been more ideal to rely on the cached `source` fields I created on the database, but that approach wouldn't have left any running code to showcase.

I did add the Javascript that I used to set the `source` fields in comments at the bottom of these files: [\[queryId\].js](./pages/api/boards/[queryId].js) & [unknown.js](./pages/api/boards/unknown.js). I would've also made it DRYer by refactoring the conditional logic for handing the `company-site` and `unknown` api slugs into the `[queryId]` handler.

That being said, I used Next as it automatically bootstraps a back-end API for you and doesn't require the configuration of a lot of event handlers. I set Next up to call the API on the server side. The API itself uses Mongoose to connect to a MongoDB Atlas cluster. For each job board, the API filters job posts based on whether its `url` matches a regex of the `root_domain` of the relevant board.

For the "Company Website" and "Unknown" cases, the API adds domain information based on the posting's `url`, and resolves them by checking if the first word of the company name is part of the URL's domain, or if it matches the domain of a job board. If the former is true, the source is a company website. If neither are true, then the source is unknown. I added cards for these two categories to the index page as well.

Finally on the front-end, I used Styled Components to rapidly develop styling. Grid was used for the cards on the index page while Flexbox was used for the content of the cards and the content of the tables. I also fixed some a11y issues with the Link component that Next seems to have ignored.

Without further ado:
[Vercel](https://csb-6y50v.vercel.app/)

The "resolver" endpoint is at `/api/boards/:id`, the ids for the special cases are `company-site` and `unknown`. The actual code is split between three files: [\[queryId\].js](./pages/api/boards/[queryId].js), [company-site.js](./pages/api/boards/company-site.js), [unknown.js](./pages/api/boards/unknown.js)

# Hello World example

This example shows the most basic idea behind Next. We have 2 pages: `pages/index.js` and `pages/about.js`. The former responds to `/` requests and the latter to `/about`. Using `next/link` you can add hyperlinks between them with universal routing capabilities. The `day` directory shows that you can have subdirectories.

# Hello World example

This example shows the most basic idea behind Next. We have 2 pages: `pages/index.js` and `pages/about.js`. The former responds to `/` requests and the latter to `/about`. Using `next/link` you can add hyperlinks between them with universal routing capabilities. The `day` directory shows that you can have subdirectories.

## Deploy your own

Deploy the example using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/vercel/next.js/tree/canary/examples/hello-world)

## How to use

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

```bash
npx create-next-app --example hello-world hello-world-app
# or
yarn create next-app --example hello-world hello-world-app
```

Deploy it to the cloud with [Vercel](https://vercel.com/import?filter=next.js&utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).
