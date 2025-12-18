import { NextResponse } from 'next/server';

const templates = [
    {
        "id": "classic-1",
        "name": "Classic",
        "slug": "classic",
        "description": "Traditional single-column layout, perfect for conservative industries.",
        "category": "professional",
        "is_premium": false,
        "preview_image_url": "/static/templates/classic-1.jpg",
        "is_active": true,
        "definition": {
            "schema_version": 1,
            "layout": {
                "type": "two_column",
                "header": "top",
                "columns": {
                    "left": 0.35,
                    "right": 0.65
                }
            },
            "style": {
                "font_family": "Inter",
                "heading_scale": 1,
                "body_scale": 1,
                "primary_color": "#111827",
                "accent_color": "#2563EB",
                "section_gap": 16,
                "line_height": 1.4
            },
            "sections": {
                "personal_info": {
                    "area": "header",
                    "order": 1,
                    "visible": true
                },
                "work_experiences": {
                    "area": "left",
                    "order": 2,
                    "visible": true
                },
                "educations": {
                    "area": "left",
                    "order": 3,
                    "visible": true
                },
                "skill_categories": {
                    "area": "right",
                    "order": 4,
                    "visible": true,
                    "display": "bars"
                },
                "strengths": {
                    "area": "right",
                    "order": 5,
                    "visible": true
                },
                "hobbies": {
                    "area": "right",
                    "order": 6,
                    "visible": true
                },
                "custom_sections": {
                    "area": "full",
                    "order": 7,
                    "visible": true
                }
            }
        }
    },
    {
        "id": "modern-1",
        "name": "Modern",
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
                    "left": 0.35,
                    "right": 0.65
                }
            },
            "style": {
                "font_family": "Inter",
                "heading_scale": 1,
                "body_scale": 1,
                "primary_color": "#111827",
                "accent_color": "#2563EB",
                "section_gap": 16,
                "line_height": 1.4
            },
            "sections": {
                "personal_info": {
                    "area": "header",
                    "order": 1,
                    "visible": true
                },
                "work_experiences": {
                    "area": "left",
                    "order": 2,
                    "visible": true
                },
                "educations": {
                    "area": "left",
                    "order": 3,
                    "visible": true
                },
                "skill_categories": {
                    "area": "right",
                    "order": 4,
                    "visible": true,
                    "display": "bars"
                },
                "strengths": {
                    "area": "right",
                    "order": 5,
                    "visible": true
                },
                "hobbies": {
                    "area": "right",
                    "order": 6,
                    "visible": true
                },
                "custom_sections": {
                    "area": "full",
                    "order": 7,
                    "visible": true
                }
            }
        }
    },
    {
        "id": "executive-1",
        "name": "Executive",
        "slug": "executive",
        "description": "Sophisticated layout for senior roles and management.",
        "category": "professional",
        "is_premium": false,
        "preview_image_url": "/static/templates/executive-1.jpg",
        "is_active": true,
        "definition": {
            "schema_version": 1,
            "layout": {
                "type": "two_column",
                "header": "top",
                "columns": {
                    "left": 0.35,
                    "right": 0.65
                }
            },
            "style": {
                "font_family": "Inter",
                "heading_scale": 1,
                "body_scale": 1,
                "primary_color": "#111827",
                "accent_color": "#2563EB",
                "section_gap": 16,
                "line_height": 1.4
            },
            "sections": {
                "personal_info": {
                    "area": "header",
                    "order": 1,
                    "visible": true
                },
                "work_experiences": {
                    "area": "left",
                    "order": 2,
                    "visible": true
                },
                "educations": {
                    "area": "left",
                    "order": 3,
                    "visible": true
                },
                "skill_categories": {
                    "area": "right",
                    "order": 4,
                    "visible": true,
                    "display": "bars"
                },
                "strengths": {
                    "area": "right",
                    "order": 5,
                    "visible": true
                },
                "hobbies": {
                    "area": "right",
                    "order": 6,
                    "visible": true
                },
                "custom_sections": {
                    "area": "full",
                    "order": 7,
                    "visible": true
                }
            }
        }
    },
    {
        "id": "creative-1",
        "name": "Creative",
        "slug": "creative",
        "description": "Bold design for designers and artists.",
        "category": "creative",
        "is_premium": false,
        "preview_image_url": "/static/templates/creative-1.jpg",
        "is_active": true,
        "definition": {
            "schema_version": 1,
            "layout": {
                "type": "two_column",
                "header": "top",
                "columns": {
                    "left": 0.35,
                    "right": 0.65
                }
            },
            "style": {
                "font_family": "Inter",
                "heading_scale": 1,
                "body_scale": 1,
                "primary_color": "#111827",
                "accent_color": "#2563EB",
                "section_gap": 16,
                "line_height": 1.4
            },
            "sections": {
                "personal_info": {
                    "area": "header",
                    "order": 1,
                    "visible": true
                },
                "work_experiences": {
                    "area": "left",
                    "order": 2,
                    "visible": true
                },
                "educations": {
                    "area": "left",
                    "order": 3,
                    "visible": true
                },
                "skill_categories": {
                    "area": "right",
                    "order": 4,
                    "visible": true,
                    "display": "bars"
                },
                "strengths": {
                    "area": "right",
                    "order": 5,
                    "visible": true
                },
                "hobbies": {
                    "area": "right",
                    "order": 6,
                    "visible": true
                },
                "custom_sections": {
                    "area": "full",
                    "order": 7,
                    "visible": true
                }
            }
        }
    },
    {
        "id": "minimal-1",
        "name": "Minimal",
        "slug": "minimal",
        "description": "Simple and effective, focusing on content.",
        "category": "minimal",
        "is_premium": false,
        "preview_image_url": "/static/templates/minimal-1.jpg",
        "is_active": true,
        "definition": {
            "schema_version": 1,
            "layout": {
                "type": "two_column",
                "header": "top",
                "columns": {
                    "left": 0.35,
                    "right": 0.65
                }
            },
            "style": {
                "font_family": "Inter",
                "heading_scale": 1,
                "body_scale": 1,
                "primary_color": "#111827",
                "accent_color": "#2563EB",
                "section_gap": 16,
                "line_height": 1.4
            },
            "sections": {
                "personal_info": {
                    "area": "header",
                    "order": 1,
                    "visible": true
                },
                "work_experiences": {
                    "area": "left",
                    "order": 2,
                    "visible": true
                },
                "educations": {
                    "area": "left",
                    "order": 3,
                    "visible": true
                },
                "skill_categories": {
                    "area": "right",
                    "order": 4,
                    "visible": true,
                    "display": "bars"
                },
                "strengths": {
                    "area": "right",
                    "order": 5,
                    "visible": true
                },
                "hobbies": {
                    "area": "right",
                    "order": 6,
                    "visible": true
                },
                "custom_sections": {
                    "area": "full",
                    "order": 7,
                    "visible": true
                }
            }
        }
    }
];

export async function GET() {
    return NextResponse.json(templates);
}
