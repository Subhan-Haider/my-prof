import re

def adapt_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replacements
    # Main container
    content = re.sub(r'className="relative min-h-screen bg-\[#090a12\] text-\[#f8fafc\] overflow-hidden"',
                     r'className="relative min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] transition-colors duration-300 overflow-hidden"', content)

    # Common background sections
    content = content.replace('bg-[#0c0e18]', 'bg-[var(--bg-surface-elevated)]')
    content = content.replace('bg-[#07080e]', 'bg-[var(--bg-surface-elevated)]')
    content = content.replace('bg-[#0f111d]/80', 'bg-[var(--bg-surface)]')
    content = content.replace('bg-[#0f111d]/75', 'bg-[var(--bg-surface)]')
    content = content.replace('bg-[#0f111d]/90', 'bg-[var(--bg-surface)]')
    content = content.replace('bg-[#111424]/60', 'bg-[var(--bg-surface)]')
    content = content.replace('bg-[#111424]/80', 'bg-[var(--bg-surface)]')
    content = content.replace('bg-[#111424]', 'bg-[var(--bg-surface)]')
    content = content.replace('bg-[#090a12]/80', 'bg-[var(--bg-surface)]')
    content = content.replace('bg-[#090a12]/90', 'bg-[var(--bg-surface)]')
    content = content.replace('bg-[#090a12]', 'bg-[var(--bg-surface)]')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Adapted: {filepath}")

if __name__ == "__main__":
    files = [
        "c:/Users/setup/Documents/claude/4/referenced-chatgpt-conversation-this-is-an/app/page.tsx",
        "c:/Users/setup/Documents/claude/4/referenced-chatgpt-conversation-this-is-an/app/projects/page.tsx",
        "c:/Users/setup/Documents/claude/4/referenced-chatgpt-conversation-this-is-an/app/projects/[slug]/page.tsx",
        "c:/Users/setup/Documents/claude/4/referenced-chatgpt-conversation-this-is-an/app/resume/page.tsx",
        "c:/Users/setup/Documents/claude/4/referenced-chatgpt-conversation-this-is-an/app/contact/page.tsx",
        "c:/Users/setup/Documents/claude/4/referenced-chatgpt-conversation-this-is-an/app/not-found.tsx",
    ]
    for f in files:
        adapt_file(f)
