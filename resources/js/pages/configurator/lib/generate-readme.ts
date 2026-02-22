export function generateReadme(): string {
    return `# Style Guide Export

This export contains two files for integrating your style guide with Claude Code:

## Setup

1. Move \`style-guide.html\` into your project root.
2. Copy the contents of \`STYLE_GUIDE.md\` into your project's root \`CLAUDE.md\` file (create one if it doesn't exist).

Once in place, Claude Code will automatically pick up on your style guide and reference it when implementing designs.
`;
}
