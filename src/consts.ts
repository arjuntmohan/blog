// Everything you'd want to change about the blog's identity lives here.

export const SITE = {
	// The name shown in the header and browser tab. Rename your blog here.
	title: 'Arjun Mohan',
	// One sentence that sums up the blog. Shows on the home page and in link previews.
	description:
		'Thinking out loud about AI, the future of work, and the tech that is quietly reshaping how we live.',
	// Shorter line used on the home page's link-preview card.
	tagline: 'Thinking out loud about AI, work, and what comes next.',
	author: 'Arjun Mohan',
	// Leave a link as '' to hide its icon.
	links: {
		linkedin: '', // e.g. 'https://www.linkedin.com/in/your-handle/'
		github: 'https://github.com/arjuntmohan',
		email: 'arjuntmohan333@gmail.com',
	},
};

// Comments are powered by giscus (https://giscus.app), which stores them as GitHub Discussions.
// Each post's comments become a discussion in the repo's "Announcements" category.
export const COMMENTS = {
	repo: 'arjuntmohan/blog',
	repoId: 'R_kgDOUWGu7w',
	category: 'Announcements',
	categoryId: 'DIC_kwDOUWGu784DFWn_',
};

// Kept for compatibility with template code that imports these names.
export const SITE_TITLE = SITE.title;
export const SITE_DESCRIPTION = SITE.description;
