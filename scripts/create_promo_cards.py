import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_card(
    input_path,
    output_path,
    headline,
    description,
    bg_top=(26, 75, 175),
    bg_bottom=(15, 45, 120),
    accent_color=(50, 110, 230, 40),
    accent_color2=(20, 90, 210, 30),
    phone_bg=(255, 255, 255),
    status_dark=True,
    time_text="9:41"
):
    # Render at 2x (920 x 2048) and downsample to 460 x 1024 with LANCZOS
    W, H = 920, 2048
    canvas = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(canvas)

    # 1. Base Gradient Background
    for y in range(H):
        ratio = y / H
        r = int(bg_top[0] + (bg_bottom[0] - bg_top[0]) * ratio)
        g = int(bg_top[1] + (bg_bottom[1] - bg_top[1]) * ratio)
        b = int(bg_top[2] + (bg_bottom[2] - bg_top[2]) * ratio)
        draw.line([(0, y), (W, y)], fill=(r, g, b, 255))

    # 2. Ambient curved decorative glow shapes
    glow_overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow_overlay)
    
    # Large soft curved arc top right
    glow_draw.ellipse([W - 260, -250, W + 750, 850], fill=accent_color)
    # Medium soft curve top left
    glow_draw.ellipse([-450, 150, 520, 1150], fill=accent_color2)
    # Bottom subtle curve
    glow_draw.ellipse([W - 550, H - 950, W + 650, H + 250], fill=accent_color)

    glow_overlay = glow_overlay.filter(ImageFilter.GaussianBlur(16))
    canvas = Image.alpha_composite(canvas, glow_overlay)
    draw = ImageDraw.Draw(canvas)

    # 3. Typography (Prominent & Sized up)
    try:
        font_title = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 82)
        font_sub = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 42)
        font_status = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 28)
    except:
        font_title = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 82)
        font_sub = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 42)
        font_status = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 28)

    # Headline (Big & Bold)
    title_bbox = draw.textbbox((0, 0), headline, font=font_title)
    title_w = title_bbox[2] - title_bbox[0]
    title_x = (W - title_w) // 2
    title_y = 90
    draw.text((title_x, title_y), headline, font=font_title, fill=(255, 255, 255, 255))

    # Subtitle / Description (Clean, generous size, and centered)
    lines = description.split("\n")
    sub_y = title_y + 106
    for line in lines:
        sub_bbox = draw.textbbox((0, 0), line, font=font_sub)
        sub_w = sub_bbox[2] - sub_bbox[0]
        sub_x = (W - sub_w) // 2
        draw.text((sub_x, sub_y), line, font=font_sub, fill=(240, 246, 255, 235))
        sub_y += 56

    # 4. Smartphone Card Mockup
    phone_x1 = 52
    phone_x2 = W - 52
    phone_y1 = 440
    phone_y2 = H + 60
    phone_w = phone_x2 - phone_x1
    phone_r = 76  # 38px at 1x

    # Phone drop shadow
    shadow_img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow_img)
    shadow_draw.rounded_rectangle(
        [phone_x1 - 12, phone_y1 - 12, phone_x2 + 12, phone_y2],
        radius=phone_r + 10,
        fill=(0, 0, 0, 120)
    )
    shadow_img = shadow_img.filter(ImageFilter.GaussianBlur(30))
    canvas = Image.alpha_composite(canvas, shadow_img)
    draw = ImageDraw.Draw(canvas)

    # 5. Insert App Screenshot inside Phone Frame
    orig_screen = Image.open(input_path).convert("RGBA")
    
    # Inner viewport bounds - fit exact width so no UI elements are cut off
    inner_margin = 16
    inner_x1 = phone_x1 + inner_margin
    inner_x2 = phone_x2 - inner_margin
    inner_y1 = phone_y1 + 84  # Below status bar area
    inner_w = inner_x2 - inner_x1

    # Scale to exactly match inner_w
    scale = inner_w / orig_screen.width
    target_h = int(orig_screen.height * scale)
    resized_screen = orig_screen.resize((inner_w, target_h), Image.LANCZOS)

    # Detect bottom color of the screenshot to smoothly fill any bottom space
    bottom_sample_y = min(target_h - 2, resized_screen.height - 2)
    bottom_color = resized_screen.getpixel((inner_w // 2, bottom_sample_y))
    if len(bottom_color) == 3:
        bottom_color = (*bottom_color, 255)

    # Phone Body Frame
    phone_layer = Image.new("RGBA", (W, H + 80), (0, 0, 0, 0))
    phone_draw = ImageDraw.Draw(phone_layer)
    phone_draw.rounded_rectangle(
        [phone_x1, phone_y1, phone_x2, phone_y2],
        radius=phone_r,
        fill=(*phone_bg, 255)
    )

    # Fill the inner area below status bar with bottom_color
    phone_draw.rectangle([inner_x1, inner_y1, inner_x2, phone_y2], fill=bottom_color)

    # Paste resized screenshot
    phone_layer.paste(resized_screen, (inner_x1, inner_y1), resized_screen if resized_screen.mode == 'RGBA' else None)

    # Top Status Bar details on Phone Frame
    status_fill = (45, 55, 72, 230) if status_dark else (240, 245, 255, 230)
    
    # Time 9:41
    time_bbox = phone_draw.textbbox((0, 0), time_text, font=font_status)
    phone_draw.text((inner_x1 + 32, phone_y1 + 26), time_text, font=font_status, fill=status_fill)

    # Dual Camera dots / Speaker notch right side
    dot_x = inner_x2 - 80
    dot_y = phone_y1 + 40
    phone_draw.ellipse([dot_x - 14, dot_y - 14, dot_x + 14, dot_y + 14], fill=status_fill)
    phone_draw.ellipse([dot_x + 36 - 14, dot_y - 14, dot_x + 36 + 14, dot_y + 14], fill=status_fill)

    # Clip the entire phone layer to its outer rounded rectangle
    clip_mask = Image.new("L", (W, H), 0)
    clip_draw = ImageDraw.Draw(clip_mask)
    clip_draw.rounded_rectangle([phone_x1, phone_y1, phone_x2, phone_y2], radius=phone_r, fill=255)
    
    canvas.paste(phone_layer.crop((0, 0, W, H)), (0, 0), clip_mask)

    # Subtle inner phone border stroke
    stroke_overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    stroke_draw = ImageDraw.Draw(stroke_overlay)
    stroke_draw.rounded_rectangle(
        [phone_x1, phone_y1, phone_x2, phone_y2],
        radius=phone_r,
        outline=(255, 255, 255, 60),
        width=2
    )
    canvas = Image.alpha_composite(canvas, stroke_overlay)

    # 6. Resize to 460 x 1024 with LANCZOS
    final_img = canvas.resize((460, 1024), Image.LANCZOS)
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    final_img.save(output_path, "PNG", optimize=True)
    print(f"Generated: {output_path}")

if __name__ == "__main__":
    uploaded_dir = "C:/Users/setup/.gemini/antigravity-ide/brain/976413c7-b543-447c-bc20-c223179c9cc7/.user_uploaded"
    out_dir = "c:/Users/setup/Documents/claude/4/referenced-chatgpt-conversation-this-is-an/public/images"

    # 1. Daily Finance
    create_card(
        input_path=os.path.join(uploaded_dir, "media_1787335923190.jpg"),
        output_path=os.path.join(out_dir, "hero_finance_promo.png"),
        headline="Smart Financials",
        description="Instant expense overview & budget\ntracking in real-time",
        bg_top=(13, 148, 136),       # Teal 600
        bg_bottom=(4, 47, 46),       # Teal 950
        accent_color=(45, 212, 191, 55),
        accent_color2=(20, 184, 166, 45),
        phone_bg=(248, 250, 252),
        status_dark=True
    )

    # 2. Grocery List
    create_card(
        input_path=os.path.join(uploaded_dir, "media_1787335923117.jpg"),
        output_path=os.path.join(out_dir, "hero_grocery_promo.png"),
        headline="Smart Grocery List",
        description="Real-time syncing & projected\nbudget management",
        bg_top=(5, 150, 105),        # Emerald 600
        bg_bottom=(6, 78, 59),       # Emerald 900
        accent_color=(52, 211, 153, 50),
        accent_color2=(16, 185, 129, 40),
        phone_bg=(250, 250, 249),
        status_dark=True
    )

    # 3. Flappy Bird
    create_card(
        input_path=os.path.join(uploaded_dir, "media_1787335923067.png"),
        output_path=os.path.join(out_dir, "hero_flappy_promo.png"),
        headline="Retro Arcade Action",
        description="Tap to flap through pipes in this\nclassic physics adventure",
        bg_top=(2, 132, 199),        # Sky 600
        bg_bottom=(12, 74, 110),     # Sky 900
        accent_color=(56, 189, 248, 55),
        accent_color2=(14, 165, 233, 45),
        phone_bg=(241, 245, 249),
        status_dark=True
    )

    # 4. Bubble Shooter
    create_card(
        input_path=os.path.join(uploaded_dir, "media_1787335923195.jpg"),
        output_path=os.path.join(out_dir, "hero_bubble_promo.png"),
        headline="Bubble Match Puzzle",
        description="Aim, match colors & pop clusters\nwith the friendly fox companion",
        bg_top=(99, 102, 241),       # Indigo 500
        bg_bottom=(30, 27, 75),      # Indigo 950
        accent_color=(168, 85, 247, 50),
        accent_color2=(129, 140, 248, 40),
        phone_bg=(248, 250, 252),
        status_dark=True
    )
