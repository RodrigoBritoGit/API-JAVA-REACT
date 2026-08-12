from docx import Document
from docx.enum.table import WD_CELL_VERTICAL_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Cm, Pt, RGBColor


OUTPUT = "Curriculo_Brendon_da_Silva_Pinto_Maurilio.docx"
BLUE = RGBColor(23, 79, 120)
DARK_BLUE = RGBColor(21, 63, 93)
TEXT = RGBColor(54, 65, 76)
MUTED = RGBColor(76, 86, 97)
LIGHT_BLUE = "EEF4F7"
LINE = "C8D3DC"


def set_cell_shading(cell, fill):
    tc_pr = cell._tc.get_or_add_tcPr()
    shading = tc_pr.find(qn("w:shd"))
    if shading is None:
        shading = OxmlElement("w:shd")
        tc_pr.append(shading)
    shading.set(qn("w:fill"), fill)


def set_cell_border(cell, side, color, size):
    tc_pr = cell._tc.get_or_add_tcPr()
    borders = tc_pr.first_child_found_in("w:tcBorders")
    if borders is None:
        borders = OxmlElement("w:tcBorders")
        tc_pr.append(borders)
    border = borders.find(qn(f"w:{side}"))
    if border is None:
        border = OxmlElement(f"w:{side}")
        borders.append(border)
    border.set(qn("w:val"), "single")
    border.set(qn("w:sz"), str(size))
    border.set(qn("w:color"), color)


def set_repeat_table_layout(table):
    table.autofit = False
    table_pr = table._tbl.tblPr
    layout = table_pr.find(qn("w:tblLayout"))
    if layout is None:
        layout = OxmlElement("w:tblLayout")
        table_pr.append(layout)
    layout.set(qn("w:type"), "fixed")


def add_section_heading(document, title):
    table = document.add_table(rows=1, cols=2)
    table.columns[0].width = Cm(5.7)
    table.columns[1].width = Cm(10.8)
    set_repeat_table_layout(table)

    title_cell, line_cell = table.rows[0].cells
    title_cell.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER
    line_cell.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER

    p = title_cell.paragraphs[0]
    p.paragraph_format.space_after = Pt(0)
    run = p.add_run(title.upper())
    run.bold = True
    run.font.name = "Arial"
    run.font.size = Pt(11)
    run.font.color.rgb = BLUE

    p = line_cell.paragraphs[0]
    p.paragraph_format.space_after = Pt(0)
    p.paragraph_format.space_before = Pt(5)
    set_cell_border(line_cell, "top", LINE, 5)

    table.rows[0].height = Cm(0.65)
    return table


def add_body_paragraph(document, text, space_after=0):
    p = document.add_paragraph()
    p.paragraph_format.space_after = Pt(space_after)
    p.paragraph_format.line_spacing = 1.22
    run = p.add_run(text)
    run.font.name = "Arial"
    run.font.size = Pt(10.2)
    run.font.color.rgb = TEXT
    return p


document = Document()
section = document.sections[0]
section.page_width = Cm(21)
section.page_height = Cm(29.7)
section.top_margin = Cm(1.75)
section.bottom_margin = Cm(1.65)
section.left_margin = Cm(2)
section.right_margin = Cm(2)

styles = document.styles
styles["Normal"].font.name = "Arial"
styles["Normal"].font.size = Pt(10.2)
styles["Normal"].paragraph_format.space_after = Pt(0)

name = document.add_paragraph()
name.paragraph_format.space_after = Pt(3)
name_run = name.add_run("BRENDON DA SILVA PINTO MAURILIO")
name_run.bold = True
name_run.font.name = "Arial"
name_run.font.size = Pt(19)
name_run.font.color.rgb = DARK_BLUE

headline = document.add_paragraph()
headline.paragraph_format.space_after = Pt(8)
headline_run = headline.add_run("PRODUÇÃO INDUSTRIAL")
headline_run.bold = True
headline_run.font.name = "Arial"
headline_run.font.size = Pt(11.5)
headline_run.font.color.rgb = RGBColor(63, 113, 143)

contact = document.add_paragraph()
contact.paragraph_format.space_after = Pt(9)
contact.paragraph_format.bottom_border = True
contact_run = contact.add_run(
    "Mogi das Cruzes — SP    •    34 anos    •    "
    "(11) 94893-5492    •    brendonmaurilio@gmail.com"
)
contact_run.font.name = "Arial"
contact_run.font.size = Pt(9.2)
contact_run.font.color.rgb = MUTED

add_section_heading(document, "Objetivo profissional")
objective = document.add_table(rows=1, cols=1)
objective.autofit = False
objective.columns[0].width = Cm(16.5)
cell = objective.cell(0, 0)
set_cell_shading(cell, LIGHT_BLUE)
set_cell_border(cell, "left", "3F718F", 20)
cell.margin_top = Cm(0.25)
cell.margin_bottom = Cm(0.25)
cell.margin_left = Cm(0.35)
cell.margin_right = Cm(0.35)
p = cell.paragraphs[0]
p.paragraph_format.space_after = Pt(0)
p.paragraph_format.line_spacing = 1.18
run = p.add_run(
    "Atuar na área de produção, contribuindo com responsabilidade, "
    "organização, atenção aos procedimentos e trabalho em equipe."
)
run.font.name = "Arial"
run.font.size = Pt(10.2)
run.font.color.rgb = TEXT

document.add_paragraph().paragraph_format.space_after = Pt(0)
add_section_heading(document, "Resumo profissional")
add_body_paragraph(
    document,
    "Profissional com experiência como Fiscal de Piso e Cronoanalista. "
    "Possui vivência em ambiente de trabalho formal, acompanhamento de "
    "rotinas, cumprimento de normas e atenção às atividades operacionais. "
    "Busca uma oportunidade para desenvolver-se e construir carreira no "
    "setor de produção industrial.",
    space_after=8,
)

add_section_heading(document, "Experiência profissional")
jobs = [
    (
        "Fiscal de Piso",
        "abr/2018 — atual",
        "Speed Solutions Prestação de Serviços Ltda. • Embu das Artes/SP",
    ),
    (
        "Cronoanalista",
        "out/2013 — out/2016",
        "P. Pires Serviços Ltda. • São Paulo/SP",
    ),
]
for index, (role, period, company) in enumerate(jobs):
    table = document.add_table(rows=2, cols=2)
    table.columns[0].width = Cm(11)
    table.columns[1].width = Cm(5.5)
    set_repeat_table_layout(table)
    for row in table.rows:
        set_cell_border(row.cells[0], "left", "8FB2C8", 12)

    role_p = table.cell(0, 0).paragraphs[0]
    role_p.paragraph_format.space_after = Pt(0)
    role_run = role_p.add_run(role)
    role_run.bold = True
    role_run.font.name = "Arial"
    role_run.font.size = Pt(11)
    role_run.font.color.rgb = TEXT

    period_p = table.cell(0, 1).paragraphs[0]
    period_p.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    period_p.paragraph_format.space_after = Pt(0)
    period_run = period_p.add_run(period)
    period_run.bold = True
    period_run.font.name = "Arial"
    period_run.font.size = Pt(9.2)
    period_run.font.color.rgb = RGBColor(63, 113, 143)

    company_p = table.cell(1, 0).paragraphs[0]
    company_p.paragraph_format.space_after = Pt(0)
    company_run = company_p.add_run(company)
    company_run.font.name = "Arial"
    company_run.font.size = Pt(9.6)
    company_run.font.color.rgb = MUTED
    table.cell(0, 0).merge(table.cell(0, 0))
    table.cell(1, 0).merge(table.cell(1, 1))

    if index == 0:
        document.add_paragraph().paragraph_format.space_after = Pt(0)

document.add_paragraph().paragraph_format.space_after = Pt(0)
add_section_heading(document, "Competências")
skills = [
    ("✓  Organização e responsabilidade", "✓  Atenção a normas e procedimentos"),
    ("✓  Pontualidade e comprometimento", "✓  Trabalho em equipe"),
    ("✓  Acompanhamento de rotinas", "✓  Disposição para aprender"),
]
skills_table = document.add_table(rows=3, cols=2)
skills_table.columns[0].width = Cm(8.25)
skills_table.columns[1].width = Cm(8.25)
set_repeat_table_layout(skills_table)
for row, values in zip(skills_table.rows, skills):
    for cell, value in zip(row.cells, values):
        p = cell.paragraphs[0]
        p.paragraph_format.space_after = Pt(2)
        run = p.add_run(value)
        run.font.name = "Arial"
        run.font.size = Pt(9.8)
        run.font.color.rgb = TEXT

document.save(OUTPUT)
