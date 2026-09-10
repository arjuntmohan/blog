// Everything you'd want to change about the blog's identity lives here.

export const SITE = {
	// The name shown in the header and browser tab. Rename your blog here.
	title: 'Arjun Mohan',
	// One sentence that sums up the blog. Shows on the home page and in link previews.
	description:
		'Thinking out loud about AI, the future of work, and the tech that is quietly reshaping how we live.',
	author: 'Arjun Mohan',
	// Leave a link as '' to hide its icon.
	links: {
		linkedin: '', // e.g. 'https://www.linkedin.com/in/your-handle/'
		github: 'https://github.com/arjunmohan333',
		email: '', // e.g. 'you@example.com'
	},
};

// Comments are powered by giscus (https://giscus.app), which stores them as GitHub Discussions.
// Fill these in after following the "Turn on comments" steps in README.md.
// Until repoId and categoryId are set, posts show a placeholder instead of the comment box.
export const COMMENTS = {
	repo: 'arjunmohan333/arjunmohan333.github.io',
	repoId: '',
	category: 'Comments',
	categoryId: '',
};

// Kept for compatibility with template code that imports these names.
export const SITE_TITLE = SITE.title;
export const SITE_DESCRIPTION = SITE.description;
