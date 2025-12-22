import { NextResponse } from 'next/server';

const templates = [
    {
        "id": "classic-1",
        "name": "Classic Professional",
        "slug": "classic",
        "description": "Traditional single-column layout, perfect for conservative industries.",
        "category": "professional",
        "is_premium": false,
        "preview_image_url": "/static/templates/classic-1.jpg",
        "is_active": true,
        "definition": {
            "schema_version": 1,
            "layout": {
                "type": "single_column",
                "header": "top"
            },
            "style": {
                "font_family": "serif",
                "heading_scale": 1.1,
                "body_scale": 1,
                "primary_color": "#1e293b",
                "accent_color": "#475569",
                "section_gap": 20,
                "line_height": 1.5
            },
            "sections": {
                "personal_info": { "area": "header", "order": 1, "visible": true, "display": "left" },
                "work_experiences": { "area": "full", "order": 2, "visible": true },
                "educations": { "area": "full", "order": 3, "visible": true },
                "skill_categories": { "area": "full", "order": 4, "visible": true, "display": "tags" },
                "strengths": { "area": "full", "order": 5, "visible": true },
                "hobbies": { "area": "full", "order": 6, "visible": true },
                "custom_sections": { "area": "full", "order": 7, "visible": true }
            }
        }
    },
    {
        "id": "modern-1",
        "name": "Modern Creative",
        "slug": "modern",
        "description": "Clean and contemporary design with a touch of color.",
        "category": "creative",
        "is_premium": false,
        "preview_image_url": "/static/templates/modern-1.jpg",
        "is_active": true,
        "definition": {
            "schema_version": 1,
            "layout": {
                "type": "two_column",
                "header": "top",
                "columns": {
                    "left": 0.3,
                    "right": 0.7
                }
            },
            "style": {
                "font_family": "Inter",
                "heading_scale": 1,
                "body_scale": 1,
                "primary_color": "#0f172a",
                "accent_color": "#2563eb",
                "section_gap": 16,
                "line_height": 1.4
            },
            "sections": {
                "personal_info": { "area": "header", "order": 1, "visible": true, "display": "left" },
                "skill_categories": { "area": "left", "order": 2, "visible": true, "display": "bars" },
                "strengths": { "area": "left", "order": 3, "visible": true },
                "hobbies": { "area": "left", "order": 4, "visible": true },
                "work_experiences": { "area": "right", "order": 5, "visible": true },
                "educations": { "area": "right", "order": 6, "visible": true },
                "custom_sections": { "area": "full", "order": 7, "visible": true }
            }
        }
    },
    {
        "id": "executive-1",
        "name": "Executive Elite",
        "slug": "executive",
        "description": "Sophisticated layout for senior roles and management.",
        "category": "professional",
        "is_premium": true,
        "preview_image_url": "/static/templates/executive-1.jpg",
        "is_active": true,
        "definition": {
            "schema_version": 1,
            "layout": {
                "type": "two_column",
                "header": "top",
                "columns": {
                    "left": 0.65,
                    "right": 0.35
                }
            },
            "style": {
                "font_family": "Garamond",
                "heading_scale": 1.2,
                "body_scale": 1.05,
                "primary_color": "#1a1a1a",
                "accent_color": "#b45309",
                "section_gap": 24,
                "line_height": 1.6
            },
            "sections": {
                "personal_info": { "area": "header", "order": 1, "visible": true, "display": "left" },
                "work_experiences": { "area": "left", "order": 2, "visible": true },
                "educations": { "area": "left", "order": 3, "visible": true },
                "skill_categories": { "area": "right", "order": 4, "visible": true, "display": "list" },
                "strengths": { "area": "right", "order": 5, "visible": true },
                "custom_sections": { "area": "full", "order": 6, "visible": true }
            }
        }
    },
    {
        "id": "minimal-1",
        "name": "Minimalist Pure",
        "slug": "minimal",
        "description": "Simple and effective, focusing on content.",
        "category": "minimal",
        "is_premium": false,
        "preview_image_url": "/static/templates/minimal-1.jpg",
        "is_active": true,
        "definition": {
            "schema_version": 1,
            "layout": {
                "type": "single_column",
                "header": "top"
            },
            "style": {
                "font_family": "system-ui",
                "heading_scale": 0.9,
                "body_scale": 0.95,
                "primary_color": "#4b5563",
                "accent_color": "#10b981",
                "section_gap": 12,
                "line_height": 1.3
            },
            "sections": {
                "personal_info": { "area": "header", "order": 1, "visible": true, "display": "centered" },
                "work_experiences": { "area": "full", "order": 2, "visible": true },
                "educations": { "area": "full", "order": 3, "visible": true },
                "skill_categories": { "area": "full", "order": 4, "visible": true, "display": "tags" }
            }
        }
    }
];

export async function GET() {
    return NextResponse.json(templates);
}
