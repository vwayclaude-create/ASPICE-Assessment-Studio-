<!-- Page 1 -->


---

<!-- Page 2 -->

Joint Quality Management in the Supply Chain
Guidelines
®
Automotive SPICE
Process assessment using the Automotive SPICE PAM 4.0
2nd revised edition, November 2023
Verband der Automobilindustrie e. V. (VDA)
German Association of the Automotive Industry (VDA)
Automotive SPICE® is a registered trademark of Verband der Automobilindustrie e. V.
(VDA)

---

<!-- Page 3 -->

Imprint
Copyright 2023 by
Verband der Automobilindustrie e. V. (VDA)
Qualit ts Management Center (QMC)
Behrean̈strasse 35, 10117 Berlin
Germany
Production:
Druckund Verlagshaus Zarbock GmbH & Co. KG
Sontraer Straße 6, 60386 Frankfurt am Main
Printed on chlorine free bleached paper

---

<!-- Page 4 -->

Nonbinding VDA standard recommendation
The Association of the German Automotive Industry (VDA) recommends its members to apply
the following standard for the implementation and maintenance of quality management systems.
Exclusion of liability
This VDA volume is a recommendation available for general use. Anyone applying it is responsible
for ensuring that it is used correctly in each case.
This VDA volume takes into account state of the art technology, current at the time of issue.
Implementation of VDA recommendations relieves no one of responsibility for their own actions.
In this respect everyone acts at their own risk.
The VDA and those involved in VDA recommendations shall bear no liability.
If during the use of VDA recommendations, errors or the possibility of misinterpretation are found,
it is requested that these be notified to the VDA immediately so that any possible faults can be
corrected.
Copyright
This publication is protected by copyright. Any use outside of the strict limits of copy-
right law is not permissible without the consent of VDA and subject to prosecution. This applies
in particular to copying, translation, microfilming and storage or processing in electronic systems.
Translations
This publication will also be issued in other languages. The current status must be requested
from VDA QMC.
Trademark
Automotive SPICE® is a registered trademark of the Verband der Automobilindustrie e. V. (VDA).
For further information about Automotive SPICE® visit www.vda-qmc.de.

---

<!-- Page 5 -->


---

<!-- Page 6 -->

Preface
Market demands require permanent innovations with increasing complexity within relia-ble time
frames. It is essential to continually improve the development processes and methods for product
creation and to ensure the stakeholders' quality expectations are met.
The VDA reworked the existing Automotive SPICE Guidelines version 1.0 based on the Process
Assessment Model Automotive SPICE 4.0 that is released in conjunction with this BlueGold-
Book. This was made to take appropriate steps to improve the quality and comparability of
assessment results.
Major improvements are made regarding addition of new domains like Hardware Devel-opment
and Machine Learning. The rating guidelines are provided for all processes in the process
assessment model and a new recommended scope for assessments has been determined.
The BlueGold-Book "Automotive SPICE for Cybersecurity" of 2021 remains a sepa-rate
document.
The "Automotive SPICE Process Assessment Model" is increasingly used within the global
automotive industry for the objective evaluation of processes and the subsequent improvement
of processes at project and organization level. It shall not be misinterpreted as a development
methodology. The objective in drawing up this document was to support the interpretation and
application of the model for the automotive industry and to provide guidance and
recommendations to increase the comparability of assessments results.
This document is aimed to support a mature and sustainable development within the automotive
industry.

---

<!-- Page 7 -->

Contents
Preface 05
Terms and glossary 12
Introduction 16
Document scope 18
Relation to ISO/IEC 330xx series 19
Relation to Automotive SPICE 20
Part 1: Interpretation and rating guidelines
1 Application of interpretation and rating guidelines 22
1.1 Overview 22
1.2 Assessment purpose 23
1.3 Defining the assessment scope 23
1.3.1 Defining the boundaries of the organizational unit 24
1.3.2 Defining the processes to be included 24
1.3.3 Defining the target capability level for each process 26
1.3.4 Defining the process context in the assessment scope 26
1.3.5 Defining instances when setting up the assessment scope 27
1.4 General rating practice 29
1.4.1 Rating outcomes and indicators 29
1.4.2 Independent rating of processes 30
1.4.3 Independent rating of base and generic practices 31
1.4.4 Sampling of work products for rating 31

---

<!-- Page 8 -->

1.4.5 Aggregation of process attribute ratings 33
1.5 Semantics and application of rating rules 35
1.5.1 Objective 35
1.5.2 Rule semantics 35
1.5.3 Rating rule formulation patterns 36
1.5.4 Further instructions for the application of rating rules 37
2 Key concepts and overall guidelines 38
2.1 No production or construction processes 38
2.2 No procurement process 39
2.3 Specific terms used in base practices 39
2.3.1 Technical scope of the HWE processes 39
2.3.2 The scope of "system" in SYS.x 40
2.3.3 Requirements process oriented concepts 44
2.3.4 Consistency and traceability 48
2.3.5 Former base practice "allocation" revised 52
2.3.6 "Communicate" base practice 53
2.3.7 Verification process oriented concepts 54
2.3.8 No explicit notion of "specification" and "strategy" at level 1 55
2.3.9 No extra BP on evaluating alternative architectures 56
2.4 Software unit behavior and unit integration, component behavior,
and software component-level verification 56
2.5 Application in specific environments 61
2.5.1 Model-based development 61
2.5.2 Agile environments 64
2.5.3 Development external to the assessed project (DEX) 68
2.5.4 Application parameters 76
3 Rating guidelines on process performance (level 1) 83
3.1 No production or construction processes 83

---

<!-- Page 9 -->

3.2 No procurement process 85
3.3 SYS.1 Requirements Elicitation 86
3.4 SYS.2 System Requirements Analysis 90
3.5 SYS.3 System Architectural Design 95
3.6 SYS.4 System Integration and Integration Verification 98
3.7 SYS.5 System Verification 100
3.8 SWE.1 Software Requirements Analysis 102
3.9 SWE.2 Software Architectural Design 107
3.10 SWE.3 Software Detailed Design and Unit Construction 110
3.11 SWE.4 Software Unit Verification 119
3.12 SWE.5 Software Component Verification and Integration Verification 123
3.13 SWE.6 Software Verification 125
3.14 VAL.1 Validation 127
3.15 MLE.1 Machine Learning Requirements Analysis 129
3.16 MLE.2 Machine Learning Architecture 130
3.17 MLE.3 Machine Learning Training 132
3.18 MLE.4 Machine Learning Model Testing 134
3.19 HWE.1 Hardware Requirements Analysis 136
3.20 HWE.2 Hardware Design 140
3.21 HWE.3 Verification against Hardware Design 143
3.22 HWE.4 Verification against Hardware Requirements 148
3.23 SUP.1 Quality Assurance 151
3.24 SUP.8 Configuration Management 155
3.25 SUP.9 Problem Resolution Management 160
3.26 SUP.10 Change Request Management 164
3.27 SUP.11 Machine Learning Data Management 169
3.28 MAN.3 Project Management 170
3.29 MAN.5 Risk Management 178
3.30 MAN.6 Measurement 182
3.31 PIM.3 Process Improvement 184
3.32 REU.2 Management of Products for Reuse 186

---

<!-- Page 10 -->

4 Rating guidelines on process capability level 2 188
4.1 PA 2.1 Process Performance Management 189
4.2 PA 2.2 Work Product Management 200
5 Rating guidelines on process capability level 3 207
5.1 PA 3.1 Process Definition 208
5.2 PA 3.2 Process Deployment Rating consistency 214
5.3 Rating consistency 218
6 Understanding capability level 4 222
7 Understanding capability level 5 224
Part 2: Guidelines for performing the assessment
8 Documented assessment process 226
8.1 Introduction 226
8.2 Assessment input and output 227
8.3 Parties and roles involved in the assessment 230
8.4 Assessment activities 232
9 Improvement process 246
9.1 Introduction 246
9.2 Improvement activities 246
10 Recommendations for performing an assessment 246
10.1 Introduction 252
10.2 Validity of assessments 253

---

<!-- Page 11 -->

10.3 Performing an assessment 254
10.4 Assessment report 256
11 Requirements relating to assessor qualification 262
11.1 Requirements for assessors 262
11.2 Requirements for lead assessors 262
11.3 Requirements for nonlead assessors 263
Bibliography 264

---

<!-- Page 12 -->

List of figures
Figure 1-1 Recommended VDA Scope and optional processes 25
Figure 2-1 Possible use of process instances to represent a mechatronic
product composition 41
Figure 2-2 Possible use of process instances to represent a microcontroller
or system on chip 42
Figure 2-3 Example architecture 43
Figure 2-4 Consistency and traceability between system and software work
products 49
Figure 2-5 Consistency and traceability between system and hardware work
products 49
Figure 2-6 Consistency and traceability between ML work products 50
Figure 2-7 Software unit behavior and unit integration, component behavior,
and software component-level verification 57
Figure 2-8 Collaborating entities 68
Figure 2-9 Interdependencies of a project integrating products from other
Parties 69
Figure 3-1 Transformation of stakeholder requirements into system require
ments 87
Figure 3-2 Traceability and consistency between SW requirements and SW
components and SW units via dynamic interaction models 114
Figure 3-3 Examples of inconsistent status between problems and other
associated work items 163
Figure 6-1 Understanding of capability level 4 for one particular process
instance 223
Figure 7-1 Understanding of capability level 5 on reducing variation across
process instances based on common causes 224

---

<!-- Page 13 -->

List of tables
tables 2-1 Comparison of location of SWE.x concepts in Automotive SPICE
versions 3.1 and 4.0 58
tables 2-2 Applicable processes for products that are developed external to
the assessed project 70
tables 3-1 Nonexhaustive examples 89

---

<!-- Page 14 -->

TERMS AND GLOSSARY
In the following, definitions of terms used in the present volume are provided. When
applicable, a citation of the definition provided in the ISO/IEC 330xx process assessment
series of standards is given in italic letters.
Please refer to ISO/IEC 33001:2015 [ISO33001] for a full glossary of the terms used in the
ISO/IEC 330xx series.
Term Definition
Assessing
The organization which performs the assessment.
organization
Assessment log
The formal documentation of the execution of an assessment drawn up by
the assessor. The assessment log is the evidence of the assessor's
assessment activities and is provided to the certification body.
Assessment scope
Definition of the boundaries of the assessment, provided as part of the
assessment input, encompassing the boundaries of the organizational unit
for the assessment, the processes to be included, the quality level for each
process to be assessed, and the context within which the processes
operate.
→ [ISO/IEC 33001:2015, 3.2.8]
Assessment sponsor
Individual or entity, internal or external to the organizational unit being
assessed, who requires the assessment to be performed and provides
financial or other resources to carry it out.
→ [ISO/IEC 33001:2015, 3.2.9]
Assessment
One or more individuals who jointly perform a process assess
team
ment.
→ [ISO/IEC 33001:2015, 3.2.10]
Assessor
Individual who participates in the rating of process attributes.
→ [ISO/IEC 33001:2015, 3.2.11]

---

<!-- Page 15 -->

Audit
A systematic, independent and documented process for obtaining audit
evidence [records, statements of fact or other informa-tion which are
relevant and verifiable] and evaluating it objectively to determine the extent
to which the audit criteria [set of policies, procedures or requirements] are
fulfilled. → [ISO 19011]
Automotive
A process assessment and reference model conformant to the
SPICE
requirements of ISO/IEC 33004:2015 [ISO33004]. It is primarily addressing
the development of embedded softwarebased systems within the
automotive domain. It can be downloaded free of charge on
www.automotivespice.com.
AUTOSAR
AUTomotive Open System ARchitecture: an initiative by the automotive
industry for standardization of software in electronic control units
(www.autosar.org).
AUTOSAR
Categories used to classify electronic control units by their area of
domains
application, e.g., chassis, poweㄱtrain, telematics, body.
Capability level
Point on a scale of achievement of the process capability derived from the
process attribute ratings for an assessed process.
Certification
A central body which administrates the certification information of the
body
trained assessors and classifies the trained assessors by their
qualifications and practical experience according to a certification scheme.
Certification
A set of rules and procedures used by a certification body to certify
scheme
assessors.
COTS
Commercial Off The Shelf
Evidence
Artifact or information reflecting practice performance. Evidence is used
during assessments to understand process performance and can comprise
documents, oral information, data or informa-tion from tools or other
sources.
Evidence
Repository for storing evidence which has been obtained.
repository
Feedback
A process step at the end of the assessment, when the assessment team
presentation
provides feedback on the results of the assessment. It usually covers the
main strengths and potential improvements. The set of provisional process
capability profiles is also presented if appropriate.

---

<!-- Page 16 -->

Findings
The evaluations documented by assessors regarding strengths and
potential improvements of the organizational unit which was evaluated,
based on verbal affirmations from interviews and work products presented
(→Evidence).
FOSS
Free and Open Source Software
Indicator
Sources of objective evidence used to support the assessor's judgment in
rating process attributes.
[ISO/IEC 33001:2015, 3.3.1]
Lead
Assessor who has demonstrated the competencies to conduct an
Assessor
assessment and to monitor and verify the conformance of a process
assessment.
→ [ISO/IEC 33001:2015, 3.2.12]
NDA NonDisclosure Agreement
OEM
"Original Equipment Manufacturer". In the automotive industry this term is
used to describe the vehicle manufacturers. (See also→ Tier 1...n).
Organization
The organizational unit which is assessed. This usually refers to projects in
assessed
one or more departments in the assessed organiza-tion.
Practice level
Lowest level of granularity within the Automotive SPICE process
assessment model, determined by the "base practices" and "generic
practices" of the processes. Strengths and potential improvements should
be traceable to this level and are derived from expectations regarding a
state of the art implementation of the practices.
Process assessment
Model suitable for the purpose of assessing a specified process quality
model (PAM)
characteristic, based on one or more process reference models
→ [ISO/IEC 33001:2015, 3.3.9]
Process
A characterization of the ability of a process to meet current or projected
capability
business goals.
Process context
Set of factors, documented in the assessment input, that influence the
judgment, comprehension, and comparability of process attribute ratings
[ISO/IEC 33001:2015, 3.2.16]
Process
Schema for use in characterizing a process quality characteristic
measurement
of an implemented process
framework
→ [ISO/IEC 33001:2015, 3.4.6]

---

<!-- Page 17 -->

Process
Set of process attribute ratings for an assessed process [ISO/IEC
(capability) profile
33001:2015, 3.2.18]
Process quality
Measurable aspect of process quality; category of process attributes that
characteristic
are significant to process quality.
[ISO/IEC 33001:2015, 3.4.9]
Process
Model comprising definitions of processes in a domain of application
reference model
described in terms of process purpose and outcomes, together with an
(PRM)
architecture describing the relationships between the processes.
→ [ISO/IEC 33001:2015, 3.3.16]
SPICE
Name of the starting project, elaborating the draft of ISO/IEC TR 15504.
These days the term "SPICE" is used colloquially to refer to ISO/IEC 330xx.
In PAM 4.0 the acronym stands for System Process Improvement and
Capability determination.
Tier 1…n
The term "Tier 1...n" is used to refer to suppliers at various levels in the
supply chain. Direct suppliers to the OEM are referred to as "Tier 1", a
supplier to a Tier 1 supplier is referred to as a "Tier 2", etc.
VDA
"Verband der Automobilindustrie", the German association of Automotive
Industry

---

<!-- Page 18 -->

Introduction
The intent of this publication is to revise the BlueGold Book Automotive SPICE Guidelines version
1 in order to improve the quality and reproducibility of assessment results.
The objective is to give necessary clarifications and recommendations for the applica-tion of
Automotive SPICE for the purpose of performing assessments and monitoring of resulting
process improvements in the development of softwarebased systems.
To fulfil this mandate, the following activities were performed:
Improving the Automotive SPICE Process Assessment and Reference Model regarding structure,
inconsistencies, clarifications and additional concepts. This was done with the publication of the
4.0 version of Automotive SPICE PRM/PAM [AS40].
Improvement and update of the guidelines on the interpretation of Automotive SPICE and on
Assessment performance. This is provided by the current publication.
Setting requirements for the qualification of assessors and updating the existing procedures,
training materials and examinations. This will be done in collaboration with the international
assessor certification scheme (intacs®) to accompany the release and roll-out of this publication
[intacs].
The current publication will replace the existing BlueGold Print Automotive SPICE Guidelines
version 1 and can be applied with its official publication in the VDA QMC online shop.
The present publication addresses the mandate by providing two parts:
Part 1: Interpretation and rating guidelines
This part provides rules for the rating performed in an assessment.
Part 2: Guidelines for performing the assessment
By defining the requirements for the assessment process, it is intended to standard-ize
the procedure, so that the companies involved in an assessment are able to follow a
defined assessments approach. This present volume specifies the requirements related
to the assessment process, as well as the qualification of assessors carrying out
assessments based on Automotive SPICE.

---

<!-- Page 19 -->

All rules for rating in assessments reflect best practices from assessors having extensive
experience in assessments based on Automotive SPICE in various applications.
Besides the knowledge of the participating members and third party members involved, the
present publication leverages other sources giving valuable input, which has been proven in many
years of assessment practice and assessor trainings. For particulars see bibliography.

---

<!-- Page 20 -->

Document scope
The scope of the current document is to support assessments using Automotive SPICE. It
addresses the process of performing the assessment and in detail the rating performed in an
assessment. It is based on the 4.0 version of the Automotive SPICE Process Assessment and
Reference Model.
Automotive SPICE 4.0 is a full process assessment model (incl. reference model) complying to
the requirements of ISO/IEC 33004 [/SO33002]. It can be used on its own to perform
assessments. The intention of this publication is NOT to replace or extend the Automotive SPICE
PAM or PRM.
The guidance given in Part 1 of this document is intended to support reproducible assessment
results but cannot reflect all the variety in practicing engineering, management and supporting
processes. Assessment teams need to understand the context of the assessed organization
before they judge a rating rule from this document to be applicable. Lists and enumerations that
supplement the process related guidance need not be interpreted as checklists for
implementation and are not intended to be complete. References to rating rules must not be
used as weakness statement to justify a rating of an indicator or a process attribute.
The aim of the Part 2 of this document is to set guidelines for the application of Automotive
SPICE to assist the assessors while planning, executing and reporting the assessment. Beside
this it specifically addresses the improvement process to resolve issues found in an assessment.
The target audience is predominantly assessors who are active in the automotive domain, but
can also be seen as an additional input for assessments in other domains. It also addresses other
parties or roles involved or affected by an Automotive SPICE assessment such as the assessing
organization, the assessed organization or the assessment sponsor.
Furthermore, the document is intended to support the understanding of the assessment process
and should be taken as a basis for clarification in case of dissent about the result of an
assessment.

---

<!-- Page 21 -->

Relation to
ISO/IEC 330xx series
The ISO/IEC 330xx series of international standards define the requirements and resources
needed for process assessment. Several standards in the ISO/IEC 330xx family were intended
to replace and extend parts of the former ISO/IEC 15504 series. ISO/IEC 330xx process
assessments are conducted based on three core elements:
ISO/IEC 330xx process assessments are conducted based on three core elements:
• process models that define processes, the entities that are the subject to assessment
• process measurement frameworks that provide scales for evaluating specified
attributes
• a specification of the process to be followed in conducting assessments.
The intention of the working group 13 of the VDA QMC was to provide a domain specific set of
documents covering these three elements for performing assessments conformant to ISO/IEC
33002 [ISO33002). This has been achieved
• by providing the Automotive SPICE process reference and assessment model [AS40]
• by defining a measurement framework derived from ISO/IEC 33020:2019
[ISO33020] for assessment of process capability using the Automotive SPICE PAM
and
• by providing a documented assessment process conformant to ISO/IEC 33002
[ISO33002] in chapter 6 of this volume.

---

<!-- Page 22 -->

Relation to
Automotive SPICE
At the beginning of the development of Automotive SPICE 4.0 different extensions to the
previous version 3.1 have been evaluated by the working group 13 to provide an updated
process set suitable for assessments in the automotive domain. Contrary to the version 1.0 of
the Guidelines for Automotive SPICE this documentation covers all processes in the process
assessment model.
Since the scope of application has been enlarged to cover different engineering domains, the
working group 13 decided to define a new recommended scope for performing assessments.
This was done in order to not increase the effort for performing an assessment and to provide
reproducibility of assessment results.
It is a principle of process assessments according to the ISO/IEC 330xx series that the process
scope (the selection of processes to be investigated in an assessment) might be adapted in
agreement with the sponsor and with respect to the purpose of the assessment.

---

<!-- Page 23 -->

Part 1: Interpretation and rating
guidelines

---

<!-- Page 24 -->

1 Application of
interpretation and rating
guidelines
1.1 Overview
The purpose of part one of the current publication is to support the assessors in interpreting
the Automotive SPICE process reference and assessment models and rating the process
attributes for the given target capability level.
These recommendations are based on the extensive experience of the assessor community.
Most of the assessments in the automotive domain do not address capability levels higher than
3. Therefore, no rating rules are provided for level 4 or 5 due the limited amount of experience
in application of these levels.
Chapter 1 "Application of interpretation and rating guidelines" introduces a clearer definition of
how-to set-up and consider the assessment purpose and scope input and provides an overall
guideline on rating in an assessment.
An integral part of the interpretation and rating guidelines are rules addressing specific key
concepts, application environments and the different capability levels.
Chapter 2 "Key concepts and overall guidelines" gives rules related to key concepts introduced
or modified with the 4.0 version of Automotive SPICE. Further, rules for rating in specific
application environments are provided.
Chapter 3 "Rating guidelines on process performance (level 1)" is related to the process specific
outcomes, base practices and work products associated with the capability level 1. In this
chapter, specific rating rules are given for each process of Automotive SPICE.

---

<!-- Page 25 -->

Chapter 4 "Rating guidelines on process capability level 2" gives specific rating rules for each
process attribute of level 2.
Chapter 5 "Rating guidelines on process capability level 3" gives specific rating rules for each
process attribute of level 3.
1.2 Assessment purpose
Automotive SPICE assessments are performed within a certain variety of use cases for specific
purposes. In general, the purpose of process assessment is to understand and assess the
processes implemented by an organizational unit.
Specifically, as defined in ISO/IEC 33001 [ISO33001], 3.2.6 the assessment purpose is a
"statement provided as part of the assessment input, which defines the reasons for
performing the assessment".
Note: The assessment purpose may not be confused with the process purpose.
Based on this definition, the assessment purpose needs to be documented when identifying
the assessment input (see also 6.2.2 Assessment inputs).
Additionally, it is strongly recommended to include the assessment purpose in the assessment
report (see chapter 8.4.2 Formal information about the assessment).
The assessment purpose may be documented by specifying the specific objectives of
the assessment such as:
• providing improvement potentials of specific processes of an organizational unit
identifying and reducing processrelated risks for a specific product delivery.
• The assessment scope (see next chapter) shall be defined to cover the assessment
purpose, accordingly.
1.3 Defining the assessment scope
As defined in ISO/IEC 33001 [/SO33001], 3.2.8 the assessment scope shall provide
"The definition of the boundaries of the assessment, provided as part of the assessment input,
encompassing
• the boundaries of the organizational unit for the assessment,
• the processes to be included,
• the quality level for each process to be assessed and
• the context within which the processes operate (process context)".

---

<!-- Page 26 -->

Note: ISO/IEC 33001 [ISO33001] uses the term "quality level". Since Automotive SPICE applies
only capability levels as a specific implementation of a quality level, the term "capability level" is
used throughout the process assessment model and within this guideline.
1.3.1 Defining the boundaries of the organizational unit
As defined in ISO/IEC 33002 [/SO33002], the boundaries of the assessed organizational unit
according to the definition in ISO/IEC 33001 [/SO33001] shall be given in the assessment
scope. The definition of the organizational boundaries shall be given in terms of
• the localization of the involved organizational unit(s) and
• the responsibilities of the involved organizational unit(s).
These boundaries shall always be defined with respect to the defined processes (see chapter
1.3.2) and the defined process context (see chapter 1.3.4).
In summary, the boundaries shall identify which part of the organization is responsible for the
performance of the given processes in the scope and provide information about the location of
the development sites. This is a necessary input for the planning of the assessment.
1.3.2 Defining the processes to be included
It is a principle of process assessments according to the ISO/IEC 330xx series that the process
scope (the selection of processes to be investigated in an assessment) might be adapted in
agreement with the sponsor and in accordance with the purpose of the assessment. Identifying
the processes "under scope" is a significant step to tailor the content of the Automotive SPICE
assessment model to cover the assessment purpose in terms of the specific development
scope of the project assessed.
The following VDA process scope provides a standard selection of processes that are
recommended to give a comprehensive overview of an assessed project. Depending on the
purpose of the assessment, this may be tailored or extended.
It consists of a set of base processes, including core supporting processes and the project
management process. This set of processes needs to be supplemented by at least one set of
engineering processes addressing a specific development domain. within the project (plug-in).
Depending on the disciplines involved in the development several plug-ins may be combined to
enable a needsbased coverage of the assessment purpose.
According to the purpose of the assessment, the recommended VDA process scope for an
assessment might be extended by other processes from Automotive SPICE (Flex scope).

---

<!-- Page 27 -->

In specific cases also other process reference models may be considered.
The recommended VDA Scope is based on the release 4.0 of the Automotive SPICE process
reference and assessment model [AS40].
Figure 1-1 Recommended VDA Scope and optional Processes
For certain use cases, the recommended VDA Scope may also be further tailored. A typical
example could be focusing on some specific aspects of the development to identify process
specific improvement opportunities only.
The processes to be assessed shall be identified and a rationale shall be documented for
choosing this specific set of processes with respect to the purpose of the assessment.
Each process in the defined assessment scope shall be assessed and the result shall be
documented in the assessment report. To ensure a sufficient basis for rating, each process
defined in the scope shall be performed at least once.
Exceptionally there might be the need to exclude or add processes after agreement of the
assessment scope, e.g., during the execution of the assessment. Any exclusion of processes
with respect to the defined scope in the rating shall be documented by a modified assessment
scope and shall be approved by the sponsor of the assessment. An exclusion of a process must
not be done based on a "not applicable" classification of the process.

---

<!-- Page 28 -->

1.3.3 Defining the target capability level for each process
Since the measurement framework used in Automotive SPICE is applicable for rating capability,
the term "capability level" as a refinement for the "quality level" is used. There are five capability
levels specified in the PAM for the assessment. As mentioned before, the rules given in this
publication are only considering capability levels 1 to 3, due to the fact that this covers most of
the Automotive SPICE assessments in the automotive domain.
Since the planning of the assessment is significantly influenced by the choice of the target
capability level, the intended maximum capability level to be assessed shall be defined for each
process as part of the assessment scope.
1.3.4 Defining the process context in the assessment scope
In ISO/IEC 33001 [ISO33001], 3.2.16 the process context is defined as
"the set of factors, documented in the assessment input, that influence the judgment,
comprehension, and comparability of process attribute ratings".
When defining the process context, the boundaries within which the processes operate in
terms of a set of aspects shall be identified.
Exemplary aspects for boundaries to be combined for defining the process context are:
• functional/content related
• time/release related
requirements/change related
Examples:
• all past releases, a specific release or a selection of specific product releases
• since a specific point in time (to address new processes, organizational changes)
• including or excluding platforms/standard components
• including or excluding open source
• all requirements and changes valid for a specific product release
• all requirements and changes excluding particular product releases
• all requirements and changes related to a defined architectural element
• all requirements and changes to be implemented between two defined project
milestones
• all changes and affected stakeholder requirements in a (delta) project developing

---

<!-- Page 29 -->

• additional functionalities based on an existing system or software
• complete system delivered by a supplier
• a complete software platform delivered by an internal or external organization
Note: The definition of the process context needs to be aligned with definition of the
boundaries of the organizational unit (see chapter 1.3.1).
Each process attribute rating shall strictly remain within the boundaries of the process context
in the assessment scope.
1.3.5 Defining instances when setting up the assessment scope
Depending on different constraints, the same process might be applied in different process
instances within the same project e.g., for parts that are developed using model-based
approaches in comparison to parts that are manual coded. Therefore, diffeㄱent process
attribute ratings might be derived for different instances of the rated process. The
corresponding rating methods are provided in the measurement framework of ISO/IEC 33020
[ISO33020], chapter 5.4.
There are different use cases, where a separation of a process into instances may be
reasonable. Building instances may reflect the need of a higher granularity of the assessment
findings due to the execution of the process with different approaches or in separate
organizations or locations.
Setting up instances doesn't change the given scope and process context of an assessment. If
instances are defined, they all shall be rated according to the given scope and the rules shall be
applied on each process performance attribute rating of each single instance.

---

<!-- Page 30 -->

To provide a more detailed understanding of the term "process instance", the following
exemplary use cases are given:
• A project has used standard process version 2 until March 2023, and standard process
version 3 since then. If the assessor can clearly see that the usage of these two standard
process versions actually do not overlap, a reasonable instantiation may be:
a rating of process instance "SWE.3 until March 2023"
a separate rating of Process instance "SWE.3 after March 2023"
• Parties responsible for different hierarchical levels in the architecture of a mechatronic
product development project use different requirements engineering ap-proaches, e.g.
a rating of process instance "SYS.2/Mechatronic level"
a separate rating of process instance "SYS.2/ECU level"
a rating of process instance "SWE.2/Application SW level"
a separate rating of process instance "SWE.2/Basis SW level”
• Different reuse strategies used for different parts of the overall SW, e.g.
a rating of process instance "SWE.x/Platform code"
a rating of process instance "SWE.x/Project specific developed code"
• Different SW development paradigms are used for different parts of the overall SW, e.g.
a rating of process instance "SWE.3/Model-based development"
a rating of process instance "SWE.3/Manual coding"
• Different subprojects use different project management approaches, e.g.
a rating of process instance "MAN.3/SW level"
a separate rating of process instance "MAN.3/Overall project"
• Different organizational units develop different parts of the software. These organizational
units might even be located in different geographical locations and regions, with probably
different social-cultural backgrounds, e.g.
- a rating of the process instances "SWE.x/Standard SW components in the reusable
platform Asia"
- a rating of the process instances "SWE.x/Standard SW components in the reusable
platform europe"

---

<!-- Page 31 -->

-
- a rating of the process instances "SWE.x/All customeㄱ/applicationspecific SW
components Germany"
Reasons for assessing different process instances separately can be meaningful e.g.
• in order to have company-internal benchmarking
• for a more accurate understanding of the various characteristics in the organization in order
to better launch precise process improvement initiatives.
The ratings of the process attributes for each process instance shall be documented in the
assessment report.
In case several instances are defined, a process is rated independently for each instance thus
resulting in separate ratings of the process. This requires an aggregation of the results to a
single process attribute rating considering the impact of the instance on the overall rating. The
recommendations how to perform the aggregation can be found in chapter 1.4.4.
1.4 General rating practice
1.4.1 Rating outcomes and indicators
1.4.1.1 Rating of practices
According to the ISO/IEC 33002:2015 [ISO33002], which defines the requirements for
performing process assessments, it is always mandatory to rate the process attributes.
Nevertheless, in terms of achieving a structured approach to determine the rating of a process
attribute, ISO/IEC 33020 [ISO33020) provides the following possibility:
Nevertheless, in terms of achieving a structured approach to determine the rating of a process
attribute, ISO/IEC 33020 [ISO33020) provides the following possibility:
Process outcomes and process attribute outcomes may be characterised as an
intermediate step to providing a process attribute rating. (ISO/IEC 33020:2019 [ISO33020],
clause 5.4)
As mentioned in the overview chapter 1.5, this publication provides rating rules. These rules
directly affect the process attribute rating or address the so-called "characterization of process
(attribute) outcomes".
In the recent years of application of Automotive SPICE, the terminology "rating a base practice"
or "rating a generic practice" has been established as a synonym for performing this step of
characterization. To avoid confusion in the community, the present publication continues using
this terminology when defining rules which are not directly affecting process attribute ratings.

---

<!-- Page 32 -->

Formally, since base and generic practices are indicators and thereby only sources of objective
evidence used to support the assessor's judgment in rating process attributes, a rating of
indicators is not a defined term in the ISO/IEC 330xx series.
In this context and since Automotive SPICE has a defined relationship between process
outcomes and base practices the terminology "rating a... practice" is the means by which the
goal of 'characterizing the outcome etc.' is achieved":
"Characterizing the outcome based on the indicator to compile a consistent process
attribute rating"
1.4.1.2 Consideration of information items
As described in the Automotive SPICE assessment model, information items (II) including their
characteristics (IIC) serve as a second type of assessment indicators. They are provided as
guidance for "what to look for" in the documentation available in the assessed organization.
The extent of implementation of an information item (in line with its defined characteristics) in
a work product serves as objective evidence supporting the assessment of a particular process.
Information item characteristics should be considered as indicators when considering whether,
given by the context, a documented information is contributing to the intended purpose of the
process.
Please refer to the process assessment model for further understanding of information items
and their relation to work products produced by the organization assessed.
1.4.2 Independent rating of processes
A process assessment model provides a two-dimensional view of a process quality
characteristic. Each process within the scope (process dimension) shall be rated individually on
the scale provided within the capability dimension.
This means that only weaknesses of the process which is subject to rating shall be the source
of a potential downrating. This implies that only BPs explicitly referring to another process (such
as the consistency/traceability BPs) can be downrated due to a weakness in that other process,
because these are the only "connection points" between processes.

---

<!-- Page 33 -->

[GEN.RL.1] A rating of PA 1.1 of P or N for a process X shall not be used to downrate PA 1.1 of
the process Y.
1.4.3 Independent rating of base and generic practices
Generally, all BPs and GPs belonging to the same process or process attributes, respectively,
are independent of each other. This means there is no rating dependency whatsoever.
The only exceptions are defined in sections 3, 4, and 5. If not otherwise specified by a rule in
those sections, the ratings of BPs and GPs belonging to the same process or process
attributes, respectively, must not depend on each other.
1.4.4 Sampling of work products for rating
The selection of the work products has to be carried out carefully to ensure that work product
samples are representative, comprehensive, and provide evidence of the implemented process.
1.4.4.1 Selection of work product samples
The following aspects apply for the selection of work products:
• coverage of the most important functions, which are relevant for the assessment
scope
• coverage of new functionality, adapted functionality, reused software and platform
software according to the assessment scope
• coverage of the whole spectrum of ASIL levels applied within the assessment
scope
• coverage of manual coding (all programming languages used) and model-based
development (all modelling tools used), where applicable.
Metrics (e.g., number of requirements, cyclomatic complexity, lines of code, number of change
requests) can support the selection of work product samples. It can be useful to select units
with different complexity to sample the corresponding detailed designs.
For the engineering processes the following approach is recommended: The assessor chooses
stakeholder requirements based on abovementioned aspects. The work products selected for
evaluating the indicators of the processes should mark a clear path through the engineering life
cycle. The same approach should be applied when evaluating supporting processes such as
change management or problem management.

---

<!-- Page 34 -->

Although the assessed organization may propose certain work products, it remains the
assessor's decision to which extent these work products are considered for the process
attribute.
In all cases the number of work product samples selected shall be representative to cover the
given assessment purpose and scope.
1.4.4.2 Plausibility checks of work product samples
All documents used as candidate for objective evidence have to be checked for consistency, in
terms of plausibility of the last change time stamp and appropriateness of the change history.
The latter can be easily checked by inspecting the history of the work product in the respective
tool which is used for configuration or document management. If a document has been initially
generated shortly before the assessment it should not be considered for the rating of the
process attribute in question unless there is a plausible reason for the late documentation.
The history of the work product should show an appropriate life cycle and a number of versions
which correlates with the update cycle of the respective work product.
For instance, it could be expected that if a schedule should be updated on a weekly basis there
is at least one version per week (or some evidence that an update was not necessary).
Technical documents tend to have more versions than plans. However, if the architecture is
based on a platform, there may not be that many versions. It is up to the assessors to check
whether the number of versions reflects appropriately the life cycle and status of the project
and fulfills the purpose of the process attribute which is assessed.
1.4.4.3 Content-related examination
The content-related examination of the work products should always cover the whole scope of
the assessment.
This means based on the criteria for the selection of the work products samples the whole
scope shall be represented.
In the limited time it is typically not possible to cover all aspects of the project. Nevertheless,
the samples shall also be checked regarding the right content. For the content of information
items, the information item characteristics can be used as guidelines.
The system requirements for example are not only to be checked to determine whether there

---

<!-- Page 35 -->

are linked stakeholder requirements but also if the system requirements reflect
the intention of the stakeholder requirements. Another example would be to check the unit
tests against the detailed design. The engineer should explain the detailed design. The unit
tests are then checked against the detailed design. Inconsistencies found between the test
cases and the explanation of the detailed design shall be considered when rating the process
attributes.
Automotive SPICE shall not be mistaken for a checklist. The assessor has the duty to check
appropriate instantiation of documentation to cover the different process attributes.
Appropriateness is based on e.g., the scope, the size and complexity of the project team (e.g.,
distributed development), the size and complexity of the product, the timeline, and other
influencing factors as defined in the process context.
1.4.5 Aggregation of process attribute ratings
It is recommended to use the rating method R2 from ISO/IEC 33020 [ISO33020] for the rating
of each process attribute.
This means,
• firstly, to rate each process attribute for each process within the scope of the assessment for
each process instance
• and secondly, aggregating the process attribute ratings of the process instances.
An aggregation of the process attribute ratings of all process instances is mandatory. This
means, in the assessment report there will be one additional set of process attribute ratings
for the aggregation.
The aggregation is done according to the following schema ("one dimensional aggregation using
arithmetic mean" according to ISO/IEC 33020 [ISO33020]):
1. Firstly, in accordance with ISO/IEC 33020 [ISO33020] NPLF rating values can be expressed
as interval values as follows:
N→ 0; P→ 1; L→ 2; F→ 3
with rounding the result to the nearest integer (by rounding up or down) and converting the
result back to the corresponding ordinal rating. Rounding rules are:
- rounding down to the nearest integer when the average value is less than the midpoint

---

<!-- Page 36 -->

between consecutive integers
- rounding up if the average value is at or above the midpoint between consecutive
integers.
2. Secondly, the aggregation can be done
a) by calculating an arithmetic mean, or
b) by assigning these internal values a percentage weighting first, and then converted
back to the ordinal NPLF rating scale. Weightings and their rationale must be explained
in the assessment report, and may depend on e.g.
size of personnel of organizational unit/subproject
strategic significance of the product, e.g., commodity vs. new innovative products
contribution to the revenue in %
criticality of product parts, e.g., a risk class according to ISO 26262
[ISO26262]
Each row represents a process as defined in the assessment scope.

---

<!-- Page 37 -->

1.5 Semantics and application of rating rules
1.5.1 Objective
Rating rules are intended to reduce variance in rating decisions across assessors because of
different individual interpretation of Assessment Indicators and rating dependencies. This is seen
as one of the key factors to improve the quality, reproducibility, and comparability of assessment
results.
1.5.2 Rule semantics
A rating rule (RL) in this guideline is defined as a directive on how to rate indicators. These can
be
• conditional (i.e., dependent on a specific context or domain such as software,
firmware, hardware, mechanical engineering, machine learning etc.). A condition can
refer to:
some context-specific scenario
the rating of an individual indicator
the rating of particular indicators
the ratings across particular indicators
• conditional (i.e., dependent on a specific context or domain such as software,
firmware, hardware, mechanical engineering, machine learning etc.). A condition can
refer to:
In the case the assessor needs to deviate from an RL a compelling justification must be
documented in the assessment report.
Examples of unconditional rules:
[CL2.RL.xx] SUP.1.BP3 shall not be rated higher than the ratings across GP 2.2.4
of all processes.

---

<!-- Page 38 -->

Examples of conditional rules:
[TPS.RL.xx] If 3rd party software is used but a valid license agreement is absent or not reflected
then SWE.2.BP1 shall be downrated.
[AGE.RL.xx] If the software architecture is modified incrementally and impact analyses evidence
that changes were discussed then SWE.2.BP1 shall not be downrated.
1.5.3 Rating rule formulation patterns
Wording Explanation
1 If <condition> then X
Condition can refer to:
shall not be downrated.
• some context-specific scenario
• the rating of an individual indicator B
• the rating of particular indicators
• the ratings across particular indicators
'X' can refer to a single indicator or to a set of
indicators.
2 If <condition> then X
Condition can refer to:
shall be downrated.
• some context-specific scenario
• the rating of an individual indicator B
• the rating of particular indicators
• the ratings across particular indicators
'X' can refer to a single indicator or to a set of
indicators.
The indicator(s) shall be downrated for at least one
step of the rating scale. It is the decision of the
assessor, if a further downrating is necessary to
reflect further identified weaknesses.
3 X shall not be rated
Condition can refer to:
higher than
·
<condition>.
• the rating of an individual indicator B
• the rating of particular indicators
• the ratings across particular indicators
'X' can refer to a single indicator or to a set of
indicators.

---

<!-- Page 39 -->

1.5.4 Further instructions for the application of rating rules
1.5.4.1 No "rating rule algebra❞
There might be cases in which for rating of a process attribute, or assessment indicator, different
rules apply in parallel. However, the application of n different rules, each requiring a downrating,
must not automatically lead to a downrating of this indicator exactly n times according to the
NPLF scale. It remains the responsibility of the lead assessor to decide on the final rating value
considering the actual context, gathered objective evidence, and identified process risk.
There may be rules that define for two indicators A and B in the same process "If A is downrated
then B shall be downrated". Still, how many NPLF steps B actually needs to be downrated also
depends on the actual context, gathered objective evidence, and identified process risk.
1.5.4.2 Assessment report and record
A rating rule, generally, cannot replace comprehensive weakness statements in the assessment
report: any downrating, or when detecting weaknesses within the percentage range of the Fully
value, requires providing a comprehensive explanation of the associated process risk,
substantiated by traceable objective evidence. Omitting, or neglecting, comprehensive and
comprehensible weakness statements in favor of only referring to rating rules is not sufficient
and therefore renders the entire assessment report invalid. A rating rule may only support a given
comprehensive and comprehensible weakness statement and a given rating. The lead assessor
takes responsibility here.

---

<!-- Page 40 -->

2 KEY CONCEPTS
AND OVERALL GUIDELINES
2.1 No production or construction processes
This PRM/PAM does not define a process or assessment indicators for production
processes. To avoid redundancies and potential inconsistencies with other international
standards having production in scope such as IATF 16949 or VDA 6.3, PRM and PAM
counterparts of production processes are not included at all.
Correspondingly, there is no process for prototype and sample construction/workshops
either.
For these reasons, 'process interfaces' to the production domain are required. In the
hardware processes this is achieved by means of
• output information items characteristics for HWE.2:
03-54 Hardware production data including
14-54 Hardware bill of material
04-55 Hardware layout
17-57 Special Characteristics
• the BP 'Ensure use of compliant samples', including comprehensive notes, for HWE.3
and HWE.4.

---

<!-- Page 41 -->

2.2 No procurement process
No procurement is introduced in this PRM/PAM for the following reasons:
• Hardware development is requirementsdriven, too. Therefore, what matters is compliance to
the requirements for the respective environment, irrespective of the source from which HW
or mechanical parts are obtained. Verification (HWE.3, HWE.4, SYS.4, SYS.5) will demonstrate
that the physical product or sample is compliant with the design and with the requirements,
respectively.
• There is no predefined standard for procurement at the level of abstraction of a PRM/PAM
beyond what is IATF 16949. Thus, defining a procurement process here would have required
the cooperation with other parties competent in the procurement domain. The identification
of, and collaboration with, such would have significantly delayed Automotive SPICE v4.0
PRM/PAM.
A 'process interface' to procurement can be considered existent by means of BP 'Develop
hardware detailed design' in HWE.2, together with note 3.
2.3 Specific terms used in base practices
Processes in Automotive SPICE are passed several times within the project lifecycle. This
iterative work concept is considered in the description of the processes (except: ACQ.2;
Automotive SPICE for Cybersecurity).
As a consequence, there is no hierarchical or temporal dependency for Base Practices and
processes. The Base Practices do not imply a certain sequence, hierarchical order or pattern.
They are primarily listed in a logical order.
Therefore, also continued reevaluation of work products and work packages is necessary in
certain processes (e.g., MAN.5, MAN.3).
2.3.1 Technical scope of the HWE processes
The technical scope of the HWE processes is electrical or electronic hardware engineering. This
excludes:
• system level engineering, i.e., neither the mechatronic nor the ECU level. See also the
definition of the term "hardware" in the glossary.
• procurement (see Section 2.2)
• mechanical or hardware sample manufacturing (see Section 2.1)

---

<!-- Page 42 -->

• production processes (see clause Section 2.1).
However, process interfaces are included to
·
• procurement in terms of receiving physical designcompliant hardware parts
• production and prototype/sample workshops in terms of providing information such as
production data and requirements, and receiving compliant samples, respectively.
2.3.2 The scope of "system" in SYS.x
The scope of the SYS processes can be interpreted in a generic way, i.e., they are not tied to a
particular system boundary. This also means that the Automotive SPICE PRM/ PAM does not
represent a product hierarchy. Rather, via different process instances the SYS.x processes may
represent a "system of systems" or different levels of a single product, e.g., mechatronic system,
a drive (motor plus ECU or an ECU).
The system boundary for:
1. a mechatronic system supplier or drive (i.e., motor plus ECU) supplier would be the
mechatronic product. Both the mechatronic system boundary and the ECU system boundary
would be reflected by separate process instances of the SYS processes in a decomposed
manner. To the ECU system boundary within the mechatronic system the considerations in
Figure 2-1 apply.

---

<!-- Page 43 -->

Figure 2-1 Possible use of process instances to represent a mechatronic product composition
2. a control device supplier would be the ECU. This system boundary can also be reflected by
the SYS processes because it typically comprises hardware, software, housing, connectors
etc. In consistency with the scope of this document, the HWE processes should then be used
to reflect development of the fully assembled PCB. In this respect, the definitions of 'hardware
part' and 'hardware component' in this document apply. See also Figure 2-1.
3. a semiconductor supplier would be e.g., a microcontroller or a system on chip. This system
boundary should be reflected in the Automotive SPICE SYS processes because besides
hardware it typically comprises a mechanical housing, firmware etc. The HWE processes
should then be used to reflect the hardware related parts of this system. Note that in this
context, the definition of 'hardware part' and 'hardware component' can represent ISO/IEC
26262's notions of 'hardware subpart' and 'hardware elementary subpart'. See also Figure 2-
2.
Figure 2-2 Possible use of process instances to represent a microcontroller or system on chip
4 a “software system”
A further scenario is a coherent software comprising different pieces of software each of which
running on a different node and/or target. Sometimes only the overall software behavior is in
focus, therefore the nodes and targets being considered transparent. Some people refer to
this as a "software system".
A seemingly obvious approach could be not to address such a "software system" via SYS.x in
favor of SWE.x because it is about software. Indeed, the

---

<!-- Page 44 -->

• overall software black-box behavior could be addressed via SWE.1
• logical and technical software interfaces between the different pieces of software in such a
"software system" could be addressed via SWE.2.BP1; the technical interfaces behind
memory-mapped IOS or microcontroller registers such as cables, connectors, or bus
connections in between would not need to be considered in SWE.2.• overall software black-
box behavior could be addressed via SWE.1
• logical interactions could be addressed as SWE.2.BP1
• the "interior" of each piece of software could be addressed via SWE.3 and SWE.4.
However, this view causes problems when it comes to SWE.5. The software requirements
will (as demanded by SWE.1.BP1) include nonfunctional expectations such as response times
or processing time limits. This indeed serves as meaningful input for software integration
verification. However, such timing requirements cannot be realized, and be verified, without
considering the nodes and targets as these will, also, consume time budgets. Depending on
the technical realization, these time budgets could even differ. Similar issues arise when
discussing SWE.6.
Further example:
Figure 2-3 Example architecture
Consider the softwarecontrolled synchronous blinking of all-round emergency flashers (Figure
2-3). This cannot be viewed as a sole "software system" while neglecting the hardware targets:
during busoff the different pieces of software cannot communicate. Therefore, they must
have established a common pulse scheme beforehand as otherwise during busoff the

---

<!-- Page 45 -->

synchronous flashing cannot be consistently maintained. The hardware, however, is subject
to tolerances, and tolerances can change over time (e.g., because of thermal influence),
potentially resulting in asynchronous flashing.
As a consequence, the notion of "software system" still requires using the SYS.x level as
network nodes and hardware targets are, in fact, relevant. The SWE.x processes alone do not
appear appropriate to address such scenarios.
2.3.3 Requirements process oriented concepts
2.3.3.1 Characteristics of requirements in SYS.2, SWE.1, HWE.1
The original motivation of having an extra verification criteria BP in Automotive SPICE was that,
according to the requirements engineering state of the art, a requirement shall be documented
in a verifiable way, otherwise it does not represent a requirement. The former extra verification
criteria BP was supposed to emphasize that. However, this has introduced PAM
misunderstandings:
1. Consider ratings such as
• BP1 "Specify Reqs" = F
• BP4 "Ver Criteria" = N or P
It is difficult to argue how requirements as a whole (BP1), which have not been formulated in a
verifiable way (BP4 = N/P), can be rated as F. Further, nonverifiable requirements even put in
question how the entire process purpose can be regarded as being fulfilled.
2. The distinct verification criteria BP appears to suggest that isolated information documented
separately from requirements would be necessary. However, verification criteria are actually
inherent in a requirements statement:

---

<!-- Page 46 -->

Example 1:
#1 "The ECU shall be able to process at least 5 speed update bus messages within 1 [s] with a
tolerance of +0.2[s]"
Example 2:
#1a "The ECU shall be able to process vehicle speed update bus messages"
#1b "When receiving vehicle speed update bus messages, the ECU shall be able to process the
bus message within 1 [s] with a tolerance of +0.2[s]"
(The texts in italics are an example of information needed to make the requirement verifiable)
3. The Automotive SPICE Guidelines v1.0, clause 2.1.3, suggested that
"There may be 'explicit additional verification criteria' on top of what a requirement already says,...
such as 'Identification of a verification method or verification step (e.g., software test, system
test) is necessary, ... special test methods, environments, ..."
The word 'may' makes it clear that this is optional for requirements processes, i.e., not mandatory.
Absence of such information therefore cannot be used for downrating.
Furthermore, the rules for SWE.6.BP1 and SYS.5.BP1 in the VDA Automotive SPICE Guidelines
v1.0 expected the same information as quoted above in italics. Consequently, downrating this
would mean "double punishment" for both the requirements and the testing process which is not
considered compliant with ISO/IEC 33004's notion of disjoint processes in a PRM.
Further, 'preconditions', 'verification methods', 'verification environment' are testing or verification
concerns, respectively, but not requirements concepts ("Separation of Concerns" principle) which
are now correctly, and exclusively, addressed in SYS.4, SYS.5, SWE.4, SWE.5, SWE.6, HWE.3,
and HWE.4.
4. Verifiability is only one out of many state of the art requirements characteristics.
Others are according to ISO/IEC IEEE 24765 [ISO24765], ISO IEEE 29148 [ISO29148],
ISO 26262, INCOSE Guide for Writing Requirements [INCOSE), IREB CPRE [IREB CPRE]
e.g.
• designfree/implementationfree
• unambiguous/comprehensible

---

<!-- Page 47 -->

• consistent in itself, not contradicting any other requirement
• complete in itself
• no redundancy across requirements
• atomic/singular.
In order to resolve all these misinterpretations the new BP1 in SYS.2, SWE.1, and HWE.1 was
introduced, which integrates the notion of verification criteria.
Note that the decision of requiring characteristics for requirements at capability level 1 is not in
conflict, or semantically overlapping, with GP 2.2.1. Reasons:
As pointed out in [Metz2016], requiring quality characteristics for outcomes is not exclusive to
capability level 2.
GP 2.2.1 of SYS.2 may address different quality criteria such as structural requirements (e.g., by
means of templates) or checklists.
2.3.3.2 Terms 'functional requirement' and
'nonfunctional requirement'
There is no clear internationally agreed definition of the terms 'functional requirement' and
'nonfunctional requirement', see discussion of references below. However, Automotive SPICE
still uses the two terms 'functional requirement' and 'nonfunctional requirement' in
requirementsoriented processes in order to
• make practitioners not forget about the importance of equally reflecting on 'nonfunctional'
characteristics
• enable assessors to downrate the absence of such information in requirements.
ISO/IEC IEEE 29148 [ISO29148] defines in clause 5.2.8.3:
• 'Functional/Performance. ... describe the system or system element functions or
tasks to be performed by the system. ...'
• 'Quality (NonFunctional) Requirements. Include a number of the 'ilities' in requirements to
include, for example, transportability, survivability, flexibility, portability, reusability, reliability,
maintainability and security.'
The IREB CPRE [IREB CPRE] says that

---

<!-- Page 48 -->

• 'Nonfunctional requirements' is an umbrella term and, thus, represents 'quality requirements'or
'constraints'.
• Quality requirements are said to be e.g., performance, reliability, usability, portability.
In ISO/IEC IEEE 24765 [ISO24765] the following can be found:
• There are two definitions for 'functional requirement':
1. 'A statement that identifies what a product or process must accomplish to produce required
behavior and/or results.'
2. 'A requirement that specifies a function that a system or system component must be able to
perform.'
• The definition of 'nonfunctional requirement' is
'A <software> requirement that describes not what the <software> will do but how the <software>
will do it.'
• Nonfunctional requirements are further claimed to be synonymous to 'design constraints'.
The systems engineering INCOSE Guide for Writing Requirements [INCOSE] in
forms:
• 'Types of requirement. Requirements that address capability and function may be expressed
in a different manner to constraints and requirements specifying other system properties
(often confusingly called 'nonfunctional' requirements – a term that will not be used again in
this guide). The guide is intended to cover the whole range of requirement types.'
2.3.3.3 "Functional" and "nonfunctional" do not serve as
requirements types
Base practice 2 of SYS.2, SWE.1, and HWE.2 require the structuring of requirements:
BP2: Structure system/software/hardware requirements. Structure and prioritize the system
requirements.
NOTE 3: Examples for structuring criteria can be grouping (e.g., by functionality) or product
variants identification.
NOTE 4: Prioritization can be done according to project or stakeholder needs via e.g., definition
of release scopes. Refer to SPL.2.
In this context, the notions "functional" and "nonfunctional" are no relevant classification or

---

<!-- Page 49 -->

categorization criteria for requirements. Reasons:
• A particular requirement may, and on most cases will, contain both functional and
nonfunctional information, and would therefore fall into both categories. See section 2.3.3.1
for examples.
• Differentiating would not have any implication on how requirements are further processed, i.e.,
there is no difference in needs for traceability, verification/validation etc.
2.3.4 Consistency and traceability
In the Automotive SPICE consistency and traceability are addressed by a BP in the engineering
processes and in the change request management process. Furthermore, consistency is
addressed in the project management process.
2.3.4.1 Purpose of consistency and traceability
The information item 13-51 'Consistency Evidence' is explained as:
·
• Demonstrating bidirectional traceability between artifacts or information in artifacts,
throughout all phases of the life cycle, by e.g.
tool links
hyperlinks
editorial references
naming conventions (i.e., "linked-by-name")
• Evidence that the content of the referenced or mapped information coheres semantically along
the traceability chain, e.g., by
performing pair working or group work

---

<!-- Page 50 -->

maintaining revision histories in documents indicating that corrections were
made in regards to other documents' content
providing change commenting (via e.g., meta-information) of database or repository
entries indicating that corrections were made in regards to other documents' content
Experience has shown that it appeared unclear how to ensure consistency without being able
to trace the two respective pieces of information (in whatever form). Therefore, these two BPs
have been reintegrated into one, which does not invalidate the abovementioned additional
advantages of traceability.
The following figure shows the relationships mentioned in the BPS respectively for traceability
and consistency:
Figure 2-4 Consistency and traceability between system and software work products

---

<!-- Page 51 -->

Figure 2-5 Consistency and traceability between system and hardware work products
Figure 2-6 Consistency and traceability between ML work products
2.3.4.2 Further advantages of traceability
Traceability between or within work products of the same process is not addressed by the
BPs at capability level 1. Instead, it may be considered in the context of GP 2.2.2 at capability
level 2.

---

<!-- Page 52 -->

In addition, bidirectional traceability further supports:
• analysis of dependencies in both directions
• determination of requirements coverage
• status tracking of implementation of requirements and verification measures
• impact analysis and risk assessment of change requests on affected work products
• impact analysis and risk assessment for changing technology
• impact analysis on cost, schedule, effort, and technical impact.
Rating rules:
None.
2.3.4.3 Granularity of traceability
The following list defines allowed levels of traceability granularity:
• requirements
single requirement
cluster of requirements
• architecture
single software component
cluster of software components
• software detailed design
single software unit
cluster of software units
• hardware design
single HW part
single HW component (i.e., a functionally coherent cluster of HW parts)
cluster of HW components

---

<!-- Page 53 -->

• verification/validation measures
single verification/validation measure
a cluster of verification/validation measure
• verification/validation results
single verification/validation results
a cluster of verification/validation results
• single change request
• single problem record
Rating rules:
[TAC.RL.1] If traceability is distinctly established between reasonable clusters of information
instead of individual atomic elements, then the 'consistency and traceability' BP shall not be
downrated.
1 More detailed explanation for traceability of clusters of SW design elements see section on
SWE.3, subsection "traceability and consistency".
2.3.4.4 Methodology/approach for traceability
A PAM does not predefine any methodology/approach or tools. The same applies for the
realization of traceability. The selected methodology/approach for traceability however need
to be appropriate for handling the given complexity, e.g., by tool support.
Rating rules:
[TAC.RL.2] If an automated tool-based approach for traceability is not used in favor of a manual
approach with snapshot-based checks, then the 'consistency and traceability' BP shall not be
downrated.
2.3.4.5 Evidence for consistency
The Automotive SPICE PAM requires ensuring consistency but not reviewing or documenting.
This means that the exact way this is done cannot be predefined. See also the information
item 13-51 'consistency evidence'.
Rating rules:

---

<!-- Page 54 -->

[TAC.RL.3] If there is no explicitly documented review record or analysis record providing evidence
of consistency between related information in favor of approaches such as performing pair
working or group work, peer spot checks, explaining entries in revision histories in documents,
or providing change commenting (via e.g., meta-information) of database or repository entries,
then the 'consistency and traceability' BP shall not be downrated.
2.3.5 Former base practice "allocation" revised
The former explicit Automotive SPICE 3.1 BPs on allocating requirements to design elements
has been removed. The idea of allocation however prevails in the following way:
• existing traceability implies allocation, while allocation without traceability is hard to be
evidenced
• the BP text in designoriented processes requires to specify the design "based on the functional
and nonfunctional requirements".
2.3.6 "Communicate" base practice
At capability level 1 it is only required that agreement and communication is effective. A PAM
cannot predefine a particular form. Therefore, the information item 13-52 'Communication
evidence' is explained as:
• All forms of interpersonal communication such as
- emails, also automatically generated ones
- tool-supported workflows
- podcasts
- blogs
- videos
- forums
- live chats
- wikis
- meetings, orally or via meeting minutes (e.g., daily standups)
This implies that it is not necessary for information, or a work product, to be communicated by

---

<!-- Page 55 -->

means of baselines in terms of configuration management. Further, following both a push or pull
principle can be acceptable. Furthermore, this means that the sender and receiver do not
necessarily need to communicate with each other directly.
Rating rules:
[COM.RL.1] If effective communication of agreed information at capability level 1 is not done
based on baselines or by explicitly documented communication or review records then BP
"Communicate" shall not be downrated.
Moreover, note that there is no full semantical overlapping with GP 2.1.6 at capability level 2.
2.3.7 Verification process oriented concepts
2.3.7.1 "Verification" instead of "testing"
The respective SYS, SWE, and HWE processes have been enhanced to address verification
(being an umbrella term) instead of testing only.
Reasons:
• Especially at the system and hardware levels, testing is not the only verification approach.
Rather, measurements (e.g., geometrical tolerances), calculations or analyses (e.g.,
strength/stress calculation using an finite element method), or simulations instead of
using physical samples are other methods of verification. The same is true for mechanical
or hardware development. Therefore, the umbrella term verification now forms the center
of those processes' purposes.
• The process SWE.4 'Unit Verification' was already an exception as a software unit can be
verified coherently by means of a combination of static analysis, testing, and code
reviews (a view that is also inherent in ISO 26262-6:2018 clause 9).
2.3.7.2 No more use of term "item" in verification processes

---

<!-- Page 56 -->

In Automotive SPICE 3.1, the term "item" referring to an object-undeㄱtest was in conflict
with other standards such as ISO 26262 'Functional safety for Road Vehicles [ISO26262].
This automotive domainspecific Functional Safety standard refers to an 'item' rather as
• a term representing a technical product or a distributed functionality from a
logicalfunctional perspective, irrespective of how many systems will help implementing
it (e.g., a new vehicle function such as adaptive cruise control, or a mechatronic
vehiclelevel system such as an automatic side door access system)
• the "thing" on which HARA is performed.
In order to
• remove conflict with other standards
• bridge the language of different standards
• enable a better alignment of Automotive SPICE assessments and other types of
assessments (e.g., ISO 26262 [ISO26262] safety audits) in practice.
Automotive SPICE 4.0 abandons the usage of the term 'item'.
2.3.8 No explicit notion of "specification" and "strategy" at level 1
Today, requirements or verification/validation measures are not necessarily contained in
a physical single document but objects or entries in e.g.
• a database
• repositories such as application lifecycle management or product lifecycle management
tools.
These entries are usually allocated to releases and product variants, which is meta-information
expressed via e.g., attributes. Further, requirements and verification measures for a particular
product may come from various sources, e.g., standard product kits or platform documentation
and new features for customers. Furthermore, selective baselining is possible for sets of entries
in such repositories.
In this PAM this is emphasized by no longer talking about 'specifications' in the respective
processes but about 'requirements' or 'verification measures' etc. This is further in line with
ISO/IEC 330xx's new notion "information items" instead of "work product" indicators.
In addition, this will prevent the assessor from downrating if such information is not represented
in one physical document.

---

<!-- Page 57 -->

Similarly, the former strategy BPs at capability level 1 have been removed in favor of reallocating
their content to other existing BPs. Further, the former processspecific work product indicators
08-xx with their work product characteristics have been removed in favor of reallocating their
content to newly defined information items.
Reasons:
1. The extra strategy BP and plan work product indicators could be misinterpreted in a way that
an explicitly written document would be required. In practice, this has resulted in downrating
BP1 if such an explicit document is not available. In some contexts this led to "oveㄱ
engineered" processes.
2. In a context where an explicitly written strategy document is necessary, the existence of a
"strategy" BP and the "plan" work product indicator, respectively, could be misinterpreted by
requiring exactly one single document, and/or following the same structure as given in the
work product characteristics.
3. That 'strategy' BP is the "plan" work product indicator could be misinterpreted by requiring a
more systematic and controlled approach at capability level 1 already. This makes the defined
semantical distinction between, and the message behind, capability levels 1 and 2 become
elusive.
As a consequence, assessment results on the same or on very similar contexts sometimes
differed very significantly.
2.3.9 No extra BP on evaluating alternative architectures
The former Automotive SPICE v3.1 base practice 'Evaluate alternative architectures' has been
revised, and integrated in SYS.3.BP3, SWE.2.BP3, and HWE.2.BP4. It is now required to
document a rational for each decision considered to be a key architecture decision of the chosen
architecture. Reason: it is considered of higher practical value to provide arguments why a given
design was chosen rather than explaining which other particular approaches were not chosen.
Further, it can be considered that the former implies the latter.
2.4 Software unit behavior and unit integration, component
behavior, and software component-level verification

---

<!-- Page 58 -->

Software unit integration
In the case a software component comprises many software units it may, depending on the
context and nature of the software component, be necessary to perform intra-component unit
integration verification first before the component itself is verified from a black-box perspective.
It may have seemed obvious to add to SWE.4 three more BPs on the explicit specification,
selection, and performing of software unit integration.
However, there are, also, contexts in which such stepwise software unit integration is not
applicable, or technically does not have added value. In such contexts, rating such additional BPs
as 'F' is considered a falsification of the message behind the rating value 'F', which is the
existence of objective evidence (found during the assessment) for an operational workflow with
no significant systematic risks. Further, rating such BPs as 'N' would possibly, and unnecessarily,
reduce the PA 1.1 rating. Furthermore, acc.to ISO/IEC 33020 [ISO33020] a rating of "not
applicable" generally is not permitted. An alternative might have been to
• introduce two different integration processes, one for the unit and one for the component
levels. However, this would have unnecessarily increased the number of
processes and introduced replication of BPs (e.g., Select..., Communicate... etc.), neither of
which were goals for Automotive SPICE 4.0
• combine SWE.2 and SWE.3. However, this would not have made the left and right side
processes symmetrical as SWE.4 and SWE.5 would both trace to such a new combined
process.
• combine SWE.2 and SWE.3, and to establish a new process such as "Unit Implementation"
around the BP "develop software units". This would have made the processes on the left and
right-hand side symmetrical. However, creating a full new process around one single BP
"develop software units" appeared unnecessarily complex.
For these reasons, the decision for Automotive SPICE 4.0 was to express both levels of
integration, namely software unit integration and software component integration into the full
software, within SWE.5. This was done by SWE.5.BP1 and SWE.5.BP4, respectively, talking
about
• "software elements", which is an umbrella term for software units and software components
(see the Automotive SPICE 4.0 glossary)
• "integrating the software elements hierarchically until the software is fully integrated".

---

<!-- Page 59 -->

This should provide freedom for the assesses to define and explain which elements in their
context are to be exactly integrated: software units alone, software components alone, or both.
Figure 2-7 Software unit behavior and unit integration, component behavior, and software
component-level verification
See also Table 2-1:

---

<!-- Page 60 -->

Table 2-1 Comparison of location of SWE.x concepts in Automotive SPICE versions 3.1 and 4.0

---

<!-- Page 61 -->


---

<!-- Page 62 -->


---

<!-- Page 63 -->

Software component standalone black-box verification
The "next step above" software unit integration is verifying a software component alone from a
black-box perspective. However, this was not sufficiently expressed in Automotive SPICE v3.1,
see Table 2-1.
For Automotive SPICE 4.0 the decision was to embed this concept in SWE.5. It was not the
decision to
• introduce a new process outside SWE.4, SWE.5, and SWE.6.
Reason: this would also have unnecessarily increased the number of processes and introduced
replication of BPs
(e.g.,Select...,Communicate... etc.) redundant, neither of which were goals.
• add it to SWE.6. Reason: software component verification happens, from a lifecycle model
perspective, after software unit
integration but before the integration of all software components into the full software. Adding
this concept to SWE.6 was considered to be less intuitive compared to the given solution of
embedding it to SWE.5. Also, it would have made necessary traceability between SWE.6 and
SWE.2 which, again, was not considered intuitive.
As a tradeoff between avoiding a mass of processes and BPs and maintaining best possible
intuitiveness, the SWE.5 process in Automotive SPICE 4.0 addresses all integration levels (see
Figure 2-7). It combines the logical flow of integration of software units into their joint software
component, software component standalone verification and integration of all software
components into the full software.
2.5 Application in specific environments
2.5.1 Model-based development
The approach of model-based development can be used for different purposes within the system
and software development. For example, models can support the requirements elicitation
process or the development of complex algorithms.
Refer to section 2.3.4 for the generic concept of consistency and traceability.

---

<!-- Page 64 -->

2.5.1.1 Models need additional descriptions
Models can be used in different use cases within the development process (e.g., for
requirements elicitation, architectural design, detailed design, code generation, verification). It
has to be defined and documented what the use case of the model is, e.g., "the system
architecture is documented using SysML".
Modelling notations may be graphical, textual, or a mixture of both and may differ depending on
the use case for the model. The syntax and semantics of the notations shall be defined in a
formal, semiformal, or informal way.
Aspects (e.g., design decisions) that the modelling notations cannot express require additional
descriptions in natural language (e.g., via text annotations). The corresponding information item
characteristics (see Annex B in Automotive SPICE PAM) give guidance for the aspects of the
additional descriptions.
The following rating rules must be interpreted in the respective context, process, and use case
(e.g., if the model is used for software requirement elicitation, the corresponding indicator is
SWE.1.BP1, if the model is used for software detailed design, the corresponding indicators are
SWE.3.BP1, SWE.3.BP2, SWE.3.BP3).
Rating rules:
[MBD.RL.1] If the syntax and semantics of the model notation are not defined or not appropriate
for the use case, the corresponding indicator shall be downrated.
[MBD.RL.2] If the additional description is missing or insufficient, the corresponding indicator
shall be downrated.
[MBD.RL.3] If the additional description is documented in extra documents but assocated with
the model, the corresponding indicator shall not be downrated.
2.5.1.2 Consistency of additional descriptions
Aspects that cannot be expressed by the modelling notation might be missing, if not documented
in some other appropriate form.
If the model itself is part of a development artifact, (e.g., for the use case of requirement
elicitation the model is part of the requirement specification), it shall be ensured that this
additional description in natural language of the model is considered in the following development
process.

---

<!-- Page 65 -->

Rating rules:
[MBD.RL.4] If the additional description for the model is not considered in downstream processes,
the corresponding indicator shall be downrated.
2.5.1.3 Models for code generation
If automated code generation is used (a.k.a. graphical programming), then the basis for the code
generation is
• inherent in the design or
• derived from the design (in which case traceability between model and design has
to be established).
Commonly, in the software design there is information which is not usable for code generation
but is important to convey an understanding of the software. An example is textual annotations
to graphical elements.
Unit verification performed at the model level shall provide evidence for consistency of the
software units with the software detailed design and with the software requirements.
Traceability and consistency support the compliance of a model and code part. The consistency
of additional descriptions with the model and/or with the auto-generated code must be
established, e.g., by reviews.
Rating rules:
[MBD.RL.5] If there is no or insufficient evidence for compliance of the auto-generated code
with the detailed design, then SWE.3.BP4 shall not be rated higher than P.
Note: this will include consistency with the nonfunctional software requirements by means of
consistency and traceability between the detailed design and the software requirements.
[MBD.RL.6] If there is no static verification and unit testing performed on code automatically
generated from the model by a qualified tool chain (and without any modification after generation),
then SWE.4.BP3 shall not be downrated.
Note: Qualified tool chain for the code generation means that there is evidence that the
generated code is correct and consistent with the model.

---

<!-- Page 66 -->

[MBD.RL.7] If there is no static verification and unit testing performed on code automatically
generated from the model by a qualified tool chain (but has been modified after the generation),
then SWE.4.BP3 shall be downrated.
2.5.2 Agile environments
Agile software development is based on principles of the Agile Manifesto with the objective to
create lightweight, adaptive development methods. Popular frameworks for agile software
development are SCRUM, KANBAN, eXtreme Programming, and SAFe.
Automotive SPICE describes meaningful process principles but does not predefine any concrete
lifecycle model, method, tool, templates, metrics, proceedings etc. (the WHAT level). This means
the Automotive SPICE content resides at a higher level of abstraction than any process
implementation (the HOW level) in order to allow for maximum freedom, and, also, for
benchmarking. In contrast, agile methods rather reside at the HOW level. Therefore, Automotive
SPICE and agile approaches cannot, by definition, contradict each other. The only valid question
would be to ask whether concrete process implementations, following or including agile methods
or not, actually satisfy the Automotive SPICE principles. Automotive SPICE does not predefine
any type of lifecycle model like Vor Waterfall-model. For details see [IntAgile].
Agile methods may support Automotive SPICE requirements and should be compliant with
required rules and standards. For example, nonfunctional requirements, review and
documentation criteria or coding guidelines are valid in an agile and nonagile life cycle.
The rating rules in this chapter are based on practical experience and have no pretention of
completeness.
The documented practical experience within this chapter are partly not specific to agile
development (e.g., missing software architecture) but have been detected often in Automotive
SPICE Assessments of projects with agile development methods.

---

<!-- Page 67 -->

2.5.2.1 Planning in agile environment
Customer planning requirements are equal in agile and nonagile development. Projects have to
ensure that the technical content of features is delivered and bugs are fixed as agreed and
scheduled. The planning methods may differ.
Therefore, the agile project has to ensure that the project planning is in line with the customer
release planning.
For example, an agile SCRUM project will ensure that the sequence of sprint cycles will deliver
the needed functionality corresponding to the customer requirements. I.e., the planning has to
ensure that the agreed features are developed and tested within the sprints before the planned
release, and the planning has to be consistent across affected parties and agreed plans.
Rating rules:
[AGE.RL.1] If evidences from project planning (e.g., backlog, burn down chart and/or sprint
planning) show gaps regarding the release planning and this aspect is significant, then the
indicators MAN.3.BP4, MAN.3.BP9, and SPL.2.BP1 shall be downrated.
Additionally, the remaining effort for function development until future deliveries and start of
production shall be estimated and covered by available capacity to ensure that additional effort
caused by underestimated tasks (e.g., user stories) is not summing up and impacts future project
milestones.
[AGE.RL.2] If remaining effort for features, which are to be delivered in the current or next release,
is not estimated then MAN.3.BP5 shall be downrated.
2.5.2.2 Project life cycle
The chosen project life cycle should fit to the project scope, requirements, deliveries, complexity,
etc. Therefore, it may be necessary to create a life cycle according to a standard process with
tailoring to meet the project needs.
For example, the customer might continuously deliver requirements to the project and expect
continuous integration by the project in order to monitor the progress of the product. An agile
development process (e.g., SCRUM or Kanban) may support the customer requirements
regarding progress monitoring and incremental requirements delivery.

---

<!-- Page 68 -->

2.5.2.3 Management of requirements
In practice, some projects manage the requirements in a change management or tracking tool in
which the requirements are managed within tasks or change requests only. These solutions may
have the benefit to trace requirements to tasks and make coding easier but have the
disadvantage that no overview of all requirements is existing. This impacts the requirements
review effectiveness regarding crossconsistency. Further, without an overview of requirements,
the maintenance of requirements is very difficult in regard to impact analysis of changes and
getting evidence that all requirements are implemented completely.
For example, a feature has different functions. In development, a first task is issued for
development of the feature. During the development period, different change requests/ tasks
are assigned to the feature and implemented to add, change or delete functions of the feature.
At project end the requirements of the feature can only be determined by assessing all tasks of
the feature.
2.5.2.4 Risk management
Customers, company or project requirements often require integrating risk management for the
development projects, and this risk management needs to be integrated into the agile project.
For instance, risk management could be integrated into an agile project by incorporating risk
assessments into sprint planning meetings and maintaining a risk register as part of the project
backlog.
2.5.2.5 Architecture
An architecture has to be defined that identifies the components which are to be traced to the
related requirements.
Agile projects have to ensure that an architecture is developed and maintained and that
traceability between architecture and requirements, architecture and detailed design, and
architecture and integration verification is established.
An example of a proceeding for architectural evolution within an agile environment can be that
basic architecture and architecture rules are defined at project start and this architecture then
being incrementally developed further within sprints (for SCRUM based projects). For all
architectural modifications an impact analysis is performed.

---

<!-- Page 69 -->

Rating rules:
[AGE.RL.3] If the system architecture is modified incrementally including impact analysis then
SYS.3.BP1 shall not be downrated.
[AGE.RL.4] If the software architecture is modified incrementally including impact analysis then
SWE.2.BP1 shall not be downrated.
2.5.2.6 Verification
Verification of system and software artifacts needs to be established in development projects.
Agile methods may combine verification levels. The agile project has then to ensure that the
process purposes of all relevant verification processes are fulfilled by the defined activities. In
such cases the related processes cannot be downrated.
2.5.2.7 Independent quality assurance
Agile development methodologies may define generic role descriptions which need to be derived
for the roles and responsibilities in the development project. By defining the responsibilities, the
project has to ensure that work product and process quality assurance are performed at project
level independently and performed objectively without conflicts of interest.
2.5.2.8 Pair programming
An agile practice denoting one programmer writing code while (at least one) other developer is
reviewing each line of code while the other developer is typing it. Developers may switch those
roles.
Rating rules:
[AGE.RL.5] If the way pair programming is actually technically performed is not in conflict with
code review requirements in terms of formal reviews, inspections, walkthroughs then SUP.1.BP3
and SWE.4.BP3 shall not be downrated.

---

<!-- Page 70 -->

2.5.3 Development external to the assessed project (DEX)
2.5.3.1 General information
Automotive softwarebased systems are typically developed as a complex collaboration of system,
hardware and software developers that are working in different organizations, organizational units
of these companies, and in development sites that can be distributed across different countries.
These organizations include the assessed organization (project) and external organizations.
Figure 2-8 Collaborating entities
External organizations contribute to such product development based on contracts or
commitments. Their activities are typically not performed under supervision of the assessed
organization.
External organizations include:

---

<!-- Page 71 -->

• the vehicle manufacturer and its subsidiaries
• contracted suppliers
• contracted subsuppliers
• contracted collaborating organizations that are not in a customeㄱsupplier relationship and
the vehicle manufacturer and its subsidiaries
• third party organizations.
Figure 2-9 Interdependencies of a project integrating products from other parties
In an Automotive SPICE assessment the processes and practices shown in Table 2-2 apply in
order to evaluate the processing of software that is developed external to the assessed project.
Software that is developed external to the assessed project includes software from collaborating
entities, third party, and reused software.

---

<!-- Page 72 -->

Table 2-2 Applicable processes for products that are developed external to the assessed project
The engineering activities of automotive softwarebased systems within an organization are not
necessarily performed at one location. In the context of a project for the development of a
particular product the necessary engineering resources, supporting resources and management
resources may be distributed across separate departments, locations, buildings, third party
service providers etc.
In the planning phase of an assessment the sponsor and the lead assessor have to determine
whether locations and departments within an organization will be covered with one assessment
or with separate assessments.

---

<!-- Page 73 -->

If all locations and departments are performing their work based on a common standard process,
it may be optimal to include them all in the assessment scope. If one location is solely responsible
for e.g., software testing the interviews for this process shall be performed with only that location.
When locations or departments have different processes, separate assessments could be
performed, or a single assessment may be organized with defined process instances for the
processes performed with the same purpose and outcomes (e.g., project management, quality
assurance, configuration management).
2.5.3.2 Maintain effective collaboration
Responsible roles within the project have to maintain effective collaboration and communication
including the definition of a consistent set of responsibilities to achieve the project goals.
Depending on the assessment scope the following aspects have to be evaluated for the
interfaces regarding development activities that are performed and results that are provided
externally to assessed project:
• scope of work for all collaborating entities
• definition of responsibilities
• interfaces between overall plans, subproject plans and plans for support organizations
• monitoring of agreed commitments
• communication between all entities
• compatibility of status models for work products
• providing necessary work products to collaborating entities
• preconditions to integrate work products from collaborating entities
• escalation mechanisms when work product requirements are not met
• verification and validation measures for the integration of system or software elements
that were developed by different collaborating entities.
Based on vehicle manufacturer strategies, the vehicle manufacturer may deliver source or object
code to the supplier's software project. I.e., the customer is part of the distributed development.

---

<!-- Page 74 -->

Rating rules:
[DEX.RL.1] If the scope of work is not defined for all collaborating entities, then MAN.3.BP1
shall not be rated higher than L.
[DEX.RL.2] If the planning of the overall project and the collaborating entities show
inconsistencies and this aspect is significant in the context of MAN.3.BP9, then MAN.3.BP9
shall be downrated.
[DEX.RL.3] If the monitoring of the overall project does not detect deviations in fulfillment of
agreed commitments from the collaborating entities and this aspect is significant in the context
of MAN.3.BP7, then MAN.3.BP7 shall be downrated.
[DEX.RL.4] If the information about the properties used for the exchange of configuration items
appears to be incompatible, then SUP.8.BP2 shall be downrated.
[DEX.RL.5] If preconditions for work products from collaborating entities to be integrated are
not fulfilled and no appropriate reaction has been started to resolve the issue, then SWE.5.BP4
or SYS.4.BP2 shall be downrated.
[DEX.RL.6] If the supplier project does not comply with the agreements and the agreed rules
for the software supplied by the customer and this aspect is significant in the context of
MAN.3.BP7, then MAN.3.BP7 shall be downrated.
[DEX.RL.7] If the customer of the assessed organization does not comply with the agreements
and the agreed rules for the software supplied by the customer, then MAN.3.BP7 shall not be
downrated but the noncompliance of the customer shall be documented in the assessment
report.
[DEX.RL.8] If escalation mechanisms across the subprojects are not defined and this aspect is
significant in the context of MAN.3.BP7 or SUP.1.BP7, then MAN.3.BP7 or SUP.1.BP7,
respectively, shall be downrated.
2.5.3.3 Acceptance of software from collaborating entities

---

<!-- Page 75 -->

Evidence is needed that software from collaborating entities has been verified according to
pass/fail criteria which are defined in validation measures. These acceptance criteria may
contain for example the review of the release documentation, fulfillment of coding guidelines
and/or code coverage of manual and automated tests in compliance with the agreed
requirements.
For software without any support from a third party provider (e.g., Free and Open Source
Software (FOSS)) the project has to define acceptance criteria based on their integration and
test concepts.
Rating rules:
[DEX.RL.9] If the verification measures for system or software integration, respectively, do not
include the verification of elements that were developed by different collaborating entities and
this aspect is significant in the context of SWE.5.BP2 or SYS.4.BP1, then SWE.5.BP2 or
SYS.4.BP1, respectively, shall be downrated.
[DEX.RL.10] If no pass/fail criteria are defined to check the compliance of third party software
and this aspect is significant in the context of SWE.5.BP1 or SWE.5.BP2, then SWE.5.BP4 shall
be downrated.
[DEX.RL.11] If third party software is not checked for compliance with defined criteria that have
to be fulfilled and this aspect is significant in the context of SWE.5.BP5 then SWE.5.BP5 shall
be downrated.
2.5.3.4 Functional and nonfunctional software requirements
The specification or the contractual basis of third party software has to cover functional and
nonfunctional software requirements.
The software requirements of the third party software have to be in line with software
requirements of the project. In case of "software which is developed by a supplier on basis of
project requirements" the project has to transfer these requirements to the supplier and should
use the associated tests as acceptance tests.
For "commercial-offtheshelf software" the project has to ensure that the commercial offtheshelf
software complies with the requirements specified for the purchased software. The specified
requirements should form the basis for acceptance testing of this kind of third party software.
The nonfunctional requirements may include e.g., quality requirements (such as specific coding
guidelines or code metric targets) which are often used to support the verification process.

---

<!-- Page 76 -->

In case the third party software does not come without any support (e.g., FOSS) then the project
has to ensure that nonfunctional requirements are met, or that the third party software (e.g.,
nonautomotive commercial-offtheshelf software) is treated according legacy software rules in
the process on the management of products for reuse (see chapter 3.32).
Rating rules:
[DEX.RL.12] If the software properties of the software from collaborating entities are not in line
with the requirements for the project and this aspect is significant in the context of SWE.2.BP4,
the indicator SWE.2.BP4 shall be downrated.
2.5.3.5 Software architecture
The software from collaborating entities and its interfaces (e.g., external AP!) have to be
considered, and put in context, in the software architecture.
For example, a purchased operating system together with its interfaces, and how the operating
system is connected to the relevant software architecture elements, has to be mentioned in the
software architecture.
Rating rules:
[DEX.RL.13] If the interfaces of software from collaborating entities are not part of the software
architecture and this aspect is significant in the context of SWE.2.BP1, then SWE.2.BP1 shall
be downrated.
[DEX.RL.14] If dynamic aspects of software from collaborating entities are not reflected of the
software architecture and this aspect is significant in the context of SWE.2.BP2, then
SWE.2.BP2 shall be downrated.
[DEX.RL.15] If the external interfaces of third party software are not reflected in the software
architecture and this aspect is significant in the context of SWE.2.BP1, then SWE.2.BP1 shall
be downrated.
2.5.3.6 Managing of Free and Open Source Software (FOSS)
FOSS is source code that allows users to use and modify the software for any purpose. In any
case, the open source license agreement has to be fulfilled by the project. Otherwise, the

---

<!-- Page 77 -->

project does not have the right to integrate and use the FOSS (e.g., open source licenses shall
be transferred to customer, whereas some open source licenses require to disclose the
complete source code of the developed system). FOSS normally does not come with support,
so the project has to define and check rules whether those free software elements and the
license fit to the project.
Note: FOSS is source code under an open source software license agreement (e.g., GNU
General Public License (GPL)).
Note: The rules for managing open source software within a company are often called open
source policy.
Rating rules:
[DEX.RL.16] If FOSS is not managed according to rules ensuring that the free and open source
software license agreement is fulfilled and this aspect is significant in the context of MAN.3.BP3,
then MAN.3.BP3 shall be downrated.
2.5.4 Application parameters
2.5.4.1 Interpretation of terms

---

<!-- Page 78 -->

In the following, the terms "calibration parameters" and "application parameters" are used
synonymously.
Automotive SPICE 4.0 defines "application parameters" as follows:
An application parameter is a software variable containing data that can be changed at
the system or software levels; they influence the system's or software behavior and
properties. The notion of application parameter is expressed in two ways: the
specification (including variable names, the domain value range, technical data types,
default values, physical unit (if applicable), the corresponding memory maps,
respectively); the actual quantitative data value it receives by means of data application.
Application parameters are not requirements. They are a technical implementation
solution for configurability-oriented requirements.
Application parameters can therefore generally be used for two scenarios:
Influencing the implemented system behavior
The software makes the system behave according to the stored application parameter data not
containing any executable or interpretable code, e.g.
• the range of the window glass in a door system within which antitrap protection shall be
active
• values for low idle speed, motor characteristic diagrams etc.
• product vehicle impacting system behavior, e.g., such as country codes, left-hand/ right-
hand steering etc.
Code selection
Code variants can be determined at compiletime by e.g., preprocessor commands or
preprocessor variable settings of e.g., the programming language C; as a result, the built
program only contains code that is to be executed. In contrast, the expected executed code can
also be determined later, i.e., at runtime, depending on application parameter values evaluated
ifclauses.
In both scenarios, the actual data set can be flashed into the system by e.g., diagnosis jobs or
end-ofline.
In this document, compiletime variants are not addressed.
2.5.4.2 Application parameters and requirements
In Automotive SPICE the processes SYS.2, SWE.1, and HWE.1 do not explicitly mention

---

<!-- Page 79 -->

application parameters.
Reason: The SYS.2 process is about documenting requirements, i.e., expectations free from
design & implementation decisions from a black-box perspective (see also Section 2.3.3).
Therefore, SYS.2 will not know whether or not the system is actually going to have software in
it. This is a decision made in the context of SYS.3 (see also Automotive SPICE PAM Section
3.4).
What SYS.2, SWE.1, and HWE.1 can require however is 'configurability' of a particular aspect.
Simplified example:
• Req #1: "The undervoltage boundary shall be configurable from O[V] to 3.4[V]."
• Req #2: "When the system detects undervoltage then the system shall shut down in less or
equal 500[ms] with a tolerance of +50[ms]."
In contrast, introducing application parameters (including the definition of the parameters'
variable names, technical data types, default values etc.) is a software design decision for
implementing such configurability requirements. Further, software application parameters are
only one out of several possible solutions for implementing a configurability requirement. An
alternative implementation solution in hardware for the same requirement would be e.g., eFuses.
Consequently, deciding on how many application parameters are to be implemented in the
software in order to express this, and on specific logical information (i.e., the parameters'
variable names, technical data types, default values etc.) is a design decision.
Rating rules:
[APA.RL.1] If the implemented application parameters and their values in the detailed design
are not consistent with configurability requirements, then SYS.3.BP1 and SYS.3.BP2 shall be
downrated.
[APA.RL.2] If the detailed design or the implementation does not include checking for allowed
value ranges of application parameters, then SWE.3.BP2 or SWE.3.BP3, respectively, shall be
downrated.
2.5.4.3 Dependencies between parameters
Application parameters may have complex interdependencies, e.g., a particular parameter A
may be exclusive to parameter B and C. Since application parameters are possible software
solutions for configurability requirements, such interdependencies represent variants at the

---

<!-- Page 80 -->

requirements level.
Examples:
• A navigational system for customer A additionally offers pointsofinterest while the variant for
customer B does not.
• A fault diagnosis for a stuck relay is not required for a semiconductor solution of a powerstage,
e.g., pulsewidth based activation an actuator.
Depending on the complexity, the mastering of such variants at the requirements level can
range from labelling requirements by e.g., meta-attributes in tools up to approaches as "feature
trees".
2.5.4.4 Application parameters for code selection at runtime may
represent product variants
Application parameters may represent product variants. Therefore, the verification parties
should use a product sample that correctly represents the desired variant. Otherwise,
verification might fail. This further emphasizes why studying the requirements by the verification
personnel is necessary.
Rating rules:
None.
2.5.4.5 Treating application parameter information as
configuration items
For any application parameter impacting software behavior representing software decisions at

---

<!-- Page 81 -->

runtime, then the
a) variable names
b) the domain value range
c) technical data types
d) default values
e) physical unit (if applicable)
f) the corresponding memory maps
are part of configuration items, and subject to baselines.
Rating rules:
[APA.RL.3] If application parameters including all aspects above are not treated as configuration
items, then SUP.8.BP1 shall be downrated.
2.5.4.6 Quality assurance on parameter information
Quality assurance activities must not only include evaluating whether data ranges, default values,
and final values are correct, but must also check for consistency of this information across all
parameters. Quality assurance must also evaluate whether the chosen data values represent
the desired product variants. This is particularly important if different parties are responsible for
different application parameters (see chapter "Responsibility for application parameters").
Example 1:
The customer wants feature F, only. Therefore, it was decided to choose product variant V2.
However, erroneously both parameters X and Y were activated which results in the product
actually realizing F, and F2, i.e., variant V1. This error should have been detected by e.g., design
or code reviews against the table.

---

<!-- Page 82 -->

Example 2:
The customer wants features F, and F2 only. Therefore, it was decided to choose variant V1.
Correspondingly, parameters X and Y were set. However, during requirements reviews, design
reviews, and code reviews it remained unnoticed that parameter Y also activates feature F,
which was never wanted.
Rating rules:
[APA.RL.4] If application parameters do not receive quality assurance with respect to technical
correctness, product variant consistency, then BP2 of SUP.1 shall be downrated.
2.5.4.7 Change management related to application parameters
Furthermore, in the context of change request management (SUP.10) the impact of a change
on application parameter information must be explicitly analyzed. For
• application parameters for code selection at runtime this means activating or deactivating
features, and, thus, changing product variants
• application parameters influencing the implemented system's behavior this means changing
the product application.
Rating rules:
None.
2.5.4.8 Application parameters and testing
Verification personnel should know about the configurability of undervoltage in the example in
2.5.4.2 as the verification measures are to be consistently traced to the requirements (SYS.2,
SWE.1).
Secondly, to prove configurability, the verification personnel will need to be able to modify

---

<!-- Page 83 -->

application parameters. This is ensured by SYS.5.BP1 aspects a) to e) which require
a) 'techniques': e.g., equivalence classes and boundary values for the undervoltage
example
b) 'entry criteria': the availability of e.g., extra parameter files to be provided by e.g., the
software department
c) 'Infrastructure/environment setup': alternatively, the testing personnel may use a
flash adapter or a calibration tool together with an e.g., *.a21 file (representing a
parameteㄱaddress mapping) to be able to modify the parameters themselves.
The fact that, in practice, the verification personnel may of course be supported, or advised, by
a requirements or software engineer here does not change the fact that the above information is
a verification concern (SYS.4, SYS.5) rather than a requirement concern (SYS.2). Recall here that
a PRM and PAM do not represent lifecycle models (see Automotive SPICE 4.0 Section 3.3.4).
Rating rules:
[APA.RL.5] If samples that are used to perform verification measures do not reflect the correct
application parameter settings, then BPS on "Verify..." or "perform verification" in SWE.4, SWE.5,
SWE.6, SYS.4, or SYS.5, respectively, shall be downrated.
2.5.4.9 Responsibility for application parameters
Application parameters for code selection at runtime
The responsibility of such application parameters for code selection at runtime (see 2.5.4.4) is
upon the supplier. Therefore, they must not be altered by the customer, so no application
parameter information is exposed.
KEY CONCEPTS AND OVERALL GUIDELINES
Parameters for influencing the implemented system behavior
Often the division of responsibility for application parameters does not follow the exact custome
ㄱsupplier boundary.
Examples:

---

<!-- Page 84 -->

• A controller device supplier defines, and implements, all application parameters but the
customer retains the right to alter some of them after the supplier's delivery.
• Owners of different reusable standard software components maintain their own. local
parameters.
Some of the parameters shall not even be accessible to the customer. In such a situation, for
e.g., product liability purposes, the responsibility for each of the application parameters should
be explicitly defined. This may be done by e.g., an addendum to a development agreement
interface.
Rating rules:
[APA.RL.6] If application parameter values can be, or are, altered at the product level by any other
party than the developers of the product, but responsibilities are not clearly defined, then
MAN.3.BP7 shall be downrated.
3 Rating guidelines on
process performance

---

<!-- Page 85 -->

(level 1)
3.1 ACQ.4 Supplier Monitoring
The purpose is to track and assess the performance of an external contract-based supplier
company against agreed commitments.
3.1.1 General information
The customer (which can also be a supplier acting as a customer) has to introduce a supplier
monitoring process for the following relationships with external contract-based suppliers:
• supplier develops a product or component on the basis of the customer requirements
• supplier maintains and delivers an offtheshelf product or component to the customer (e.g.,
operating system, device drivers, system with hardware and software) supplier delivers a
product or component with offtheshelf subcomponents on the basis of customer requirements
• Interfaces between supplier and customer have to be established for exchanging, monitoring,
and tracking all relevant information between both parties. Even for component deliveries (e.g.,
commercial offtheshelf), interfaces have to be set up and maintained for managing changes
and problem reports.
3.1.1.1 Monitoring all contract-based suppliers
All project relevant contract-based suppliers have to be tracked, and their performance against
the agreed requirements has to be assessed. Based on the context of the project, this may
include suppliers for engineering services, commercial offtheshelf products, firmware, etc.
Excluded from ACQ.4 are suppliers delivering products without any support (e.g., open source
software).
3.1.1.2 Incomplete agreements with supplier
Agreements between supplier and customer have to be established and maintained, which cover:
• supplier's content and scope
• relevant requirements and standards from the customer

---

<!-- Page 86 -->

• interface agreement
• exchanged information between customer and supplier
• joint activities across the interfaces, such as joint problem and change manage
ment, and joint reporting and reviews
• responsibilities and stakeholders
• escalation mechanism.
Examples for such agreed documents are DIAS (Distributed Interface Agreements), SOWS
(Statements Of Work), license agreements, etc.
3.1.2 Rating rules within the process
The following figure shows the relationships between ACQ.4 base practices as well as their
relationships to other processes:
These relationships are used as the basis for the rating rules defined in the following.
Rating rules:
[ACQ.4.RL.1] If the indicator BP1 is downrated due to incomplete agreements about exchanged
information between customer and supplier, the corresponding indicator BP2 shall be downrated.
3.1.3 RATING GUIDELINES ON PROCESS
None.

---

<!-- Page 87 -->

3.2 SPL.2 Product Release
The purpose is to control the release of a product to the intended customer.
3.2.1 General information
In the course of a product development the functional content, that is agreed with the customer
or a development partner, is usually implemented in an iterative and incremental way. The
prioritization of the functionalities to be realized is done via the requirements analysis processes
SYS.2, SWE.1, HWE.1 and MLE.1.
3.2.2 Rating rules within the process
3.2.2.1 Release scope
The sequence of implementing these functionalities is determined in the release scope. The
release scope is not necessarily a separate document. The relevant release planning aspects can
be part of the project's schedule.
Rating rules:
[SPL.2.RL.1] If the scope of the current release is not identified in detail (features and/ or
functions per release), the indicator BP1 shall be not rated higher than P.
A release package consists usually of the released product, the information about the product
and the release, and supporting tools as needed.
3.2.2.2 Release note
Changes and improvements that are made to the content of the delivered product compared to
previous releases shall be documented in the release note.
Rating rules:
[SPL.2.RL.2] If the release notes do not describe changes compared to previous releases, BP6
shall be downrated.
3.2.3 Rating rules with other processes
The information regarding verification and validation results of the product has to be considered.

---

<!-- Page 88 -->

Rating rules:
[SPL.2.RL.3] If the content in the release notes is inconsistent with the results from VAL.1, SYS.4,
SYS.5, SWE.4, SWE.5, SWE.6, HWE.3, HWE.4 then SPL.2.PA1.1 shall not be rated higher than
P.
3.3 SYS.1 Requirements Elicitation
The purpose is to gather, analyze, and track evolving stakeholder needs and requirements
throughout the lifecycle of the product and/or service to establish a set of agreed requirements.
3.3.1 General information
3.3.1.1 Direct or indirect traceability to customer requirements
Customer requirements specifications (being stakeholder requirements) may include subdomain
requirements or design constraints (e.g., software, hardware) which, cleaㄱly, do not address the
system requirements (SYS.2) but the software and hardware subdomains (SWE.1, HWE.1). Also,
customer specifications often include design constraints, i.e., exact demands on 'how' something
must be realized or implemented, thereby addressing the system architecture (SYS.3) or the
software and hardware designs (SWE.2, SWE.3, HWE.2) directly. In contrast to design
constraints, requirements generally describe the problem space leaving open the solution space.
Since customer requirements specifications are to be distilled and transformed by the supplier
into system requirements SYS.2 (see Figure 3-1), such subdomain customer requirements and
design constraints must not "just" be taken as is without further evaluation. The original intention
and problem behind such subdomain customer requirements and customer design constraints
are to be identified. This may lead to new and necessary (but formerly unidentified) systemlevel
requirements that may or may not replace those customer subdomain requirements and design
constraints. This is exactly what is behind the purpose of SYS.1: eliciting the actual wants, needs,
and intentions behind seemingly fixed stakeholder requirements, discussing them, and finally
agreeing on the results. This helps to make sure that no "hidden" system requirement is
neglected.

---

<!-- Page 89 -->

Figure 3-1 Transformation of stakeholder requirements into system requirements
In some cases, if after a sound evaluation clarity is reached on why
• the customer needs to insist on the subdomain requirement, or on the design constraint even
if more economically or technologically more suitable design solutions might be possible (note
that the supplier is in charge of the overall solution space, and the customer may not have a
full overview the impact of such design constraints on the supplier's overall solution)
• the subdomain requirement or design constraint, respectively, has no unidentified impact or
sideeffect on existing system requirements and system architectural decisions
then the customer design constraint or customer subdomain requirement may still actually be
confirmed as such. In such case, the respective subdomain requirement or design constraint
does not need to be repeated at (i.e., or copied to) different levels of requirements specifications
or designs, respectively. Instead, it may be directly put into the corresponding subdomain
requirement specification (SWE.1/HWE.1), or reflected at the respective design level (SYS.3,
SWE.2, SWE.3, HWE.2), with direct traceability to the customer specification only. However, this
must be agreed on by the subdomain and system representatives. Such agreements further
represent, and promote, early
interaction of different domain experts thereby contributing to reducing requirements

---

<!-- Page 90 -->

interpretation issues early.
3.3.1.2 Vertical tracing to stakeholder requirements
There may be customer requirements (being stakeholder requirements) that address, or
represent, properties or characteristics of the direct physical end product. Other customer
requirements may address work product or process characteristics such as MISRA guidelines,
coding guidelines, reaching Automotive SPICE capability level x. Examples see Table 3-1.
Only the former, but not the latter, are subject to
• vertical downward traceability. Their identification can be documented via e.g., requirements
structuring or tool-based attributes (see Table 3-1 for examples), and
• horizontal traceability to verification measures (as defined in the Automotive SPICE PAM
glossary) in SYS.4, SYS.5, SWE.4, SWE.5, SWE.6. HWE.3, HWE.4).
In contrast, stakeholder requirements that address work product or process characteristics are
still to be verified or validated, respectively (as any requirement must be). This can be done e.g.,
by
• either commenting in e.g., the customer specification that e.g., process requirements are
already satisfied by a supplier standard process or work instruction. In this case, they do not
need to be added to the SYS.2 requirements.
• or, if not already covered as stated above, by still adding them to the SYS.2 requirements in
order to not lose their verification. Note, however, that such verification is not subject to
horizontal traceability to SYS.4, SYS.5, SWE.4, SWE.5, SWE.6. HWE.3, HWE.4 because the
evidence will not be verification measures according to the definition in the Automotive SPICE
PAM glossary. See Table 3-1 for examples. Further note that Automotive SPICE is not a
lifecycle model (see Automotive SPICE PAM Section 3.3.4). This means that e.g., a system
testing dept. is not automatically responsible for verifying e.g., process requirements.

---

<!-- Page 91 -->

Table 3-1 Nonexhaustive examples
3.3.2 Rating rules within the process
Rules for rating consistency between the BPs in this process are not defined. This is due to the
nature of BPS as describing separate concerns which shall be addressed individually. Further, a
process attribute shall be rated based on the process performance indicators, i.e., not based on
a subset.
3.3.3 Rating rules with other processes at level 1
None.

---

<!-- Page 92 -->

3.4 SYS.2 System Requirements Analysis
The purpose is to establish a structured and analyzed set of system requirements consistent with
the stakeholder requirements.
3.4.1 General information
Stakeholder requirements can be in contradiction to each other e.g., legal regulations with
specific customer needs. System requirements will be in such a case derived as a tradeoff
between such stakeholder requirements in dialog with the customer.
3.4.1.1 Iterative vs. incremental development
Normally the functional content in the product changes iteratively and incrementally, i.e., it
evolves across releases. The term "increment" can be understood as adding a feature or element
that did not exist before (analogy: building a house). The term "iteration" can be understood as
refining, or adapting, an existing feature or element (analogy: a sculptor working on a sculpture).
Therefore, the complete set of requirements of the final end product does not necessarily have
to be available at the project start. Rather, release scopes agreed with the customer will define
increments and iterative rework. In this respect, requirements creation can be driven by release
definitions over time.
s
3.4.1.2 Analysis of impact on the system context
SYS.2.BP1 specifies the requirements for the system under consideration alone, i.e., the ones
the system shall implement. In contrast, BP4 asks for the impact and consequences the system
has on its system context because of those requirements. In requirements engineering the term
"system context" is a defined technical term. Its meaning denotes anything outside, i.e., beyond,
the boundary of the system under consideration in SYS.2. Elements in the system context such
as
• human users
• other mechatronic systems
• other controller devices
trigger the system's functionalities, are receivers and users of results of the system's
functionalities, interact with the system, or have interfaces with the system. Note that "interface"
here may not only refer to direct interaction interfaces but also to indirect

---

<!-- Page 93 -->

ones. For example, another system installed in very close proximity of the system under
consideration may suffer from its heat or radiation emission.
In alignment with section 2.3.2 examples are:
• vehicle
noise, exhaust, leakage (e.g., fuel, oil, water, gas, refrigerants)
• end user interfaces
stress, distraction, discomfort or fatigue as a result of poorly designed or oveㄱdesigned HMIs
• mechatronic system
vibration, acoustics, forces (e.g., tailgate, automatic door access system), leakage (oil,
refrigerant...), stored energy (e.g., preloaded springs), moving or rotating elements, kinetic
energy, electrostatic and electromagnetic phenomena, electrically live parts, debris of worn
parts etc.
• ECU
signal quality, emission of heat or radiation, size conflicting with the designed mounting space,
weight conflicting with connection technology used in the system context.
Such impact on the system context needs to be communicated back to the owners of the
respective elements in the system context. This impact may or may not lead to changes of the
requirements of the system under consideration of the system context.
Note that for SWE.1 and HWE.1 the decision was to keep the term operating environment for
two reasons:
1. The usage of the term "system" might not appear intuitive for processes that deal with
software and hardware only.
2. Software runs on a target which is better expressed by using "operating environment".
3.4.1.3 Structuring of requirements and mapping to releases
A possible approach to prioritizing requirements is the allocation of requirements to releases. The
usage of such an approach will imply that the content of the next and future releases is defined.
Further ways of structuring requirements are e.g., using attributes in tools for categorization, a
hierarchical headline structure with an adequate depth.
Rating rules:

---

<!-- Page 94 -->

[SYS.2.RL.1] If there is no evidence for prioritization but a separate release plan consistently
mapping system functionality to future releases then SYS.2.BP2 shall not be downrated.
3.4.1.4 Traceability and consistency
See also section 3.3.1 of SYS.1 and section 2.3.4 here.
Further, the considerations in section on SWE.3, subsection "Traceability and Consistency" apply
to SYS.3 correspondingly.
3.4.2 Rating rules within the process
3.4.2.1 System requirements
Rating rules:
[SYS.2.RL.2] If different approaches of documenting requirements are used concurrently (e.g.,
word processor file, application lifecycle management tool, database) then SYS.2.BP1 shall not
be downrated.
[SYS.2.RL.3] If not all system requirements are derived from, and traced to, the customer
requirements but to internal standard requirements or to a product line/platform according to a
reuse or application strategy, then SYS.2.BP1 and SYS.2.BP5 shall not be downrated.
[SYS.2.RL.4] If not all system requirements of the final product are available because of release
driven incremental development, then SYS.2.BP1 and SYS.2.BP2 shall not be downrated.
3.4.2.2 Structuring of requirements
To support the understanding in section 2.3.3.3:
Rating rules:
[SYS.2.RL.5] If the notions "functional" and "nonfunctional" are the only requirements structuring,
categorization, or classification criterion, then SYS.2.BP2 shall be rated as N.
[SYS.2.RL.6] If the notions "functional" and "nonfunctional" are not used as a structuring,
categorization, or classification criterion, then SYS.2.BP2 shall not be downrated.

---

<!-- Page 95 -->

3.4.2.3 Analysis of requirements
The indicator SYS.2.BP3 says "Analyze system requirements. ...and to support project
management regarding project estimates".
This means for example:
• Consider an analysis that was done on a set of 100 requirements together with the project
manager during a project progress meeting. As a result, 40 out of the 100 requirements were
decided to be rejected, therefore being attributed as such with an accompanying comment
providing expectations.
• Consider a set of 10 requirements that are planned for the next release. The development
team reports to the project manager that this is no longer feasible due to resource constraints.
The decision is to not change the status of those 10 requirements but to reallocate them to
future releases in agreement with the relevant stakeholders. This can be evidenced by a
comparison of the release plans (which is the process context of MAN.3 but not SYS.2).
Analysis of requirements can be done by means of using e.g., tool-based attributes, or
comments added to the requirements text.
The analysis of system requirements is the basis for a correct implementation. Even though
requirements sometimes appear very simple, a well-founded analysis shall be conducted for
those requirements. The scope and appropriateness of the analysis depends on the context of
product (e.g., platform). The results of analysis can vary from a simple attribute to a complex
simulation or the building of a demonstrator to evaluate the feasibility of system requirements.
Analysis of requirements may be, but does not have to be, done as a part of a review.
The reason for having associated this BP with the supporting of project management regarding
project estimates is the following: revising system requirements by means of an analysis may
(re)define the scope of work. Once this solution is settled, SYS.5 will select verification measures
for addressing exactly that problem space. This is to say, SYS.5 itself does not change that
problem space, therefore does not alter the overall project's scope of work.
Rating rules:
[SYS.2.RL.7] If analysis results of requirements are not demonstrated by means of separate
analysis reports or review records but by means of e.g., tool-supported attributes or tool-
supported commenting, then SYS.2.BP3 shall not be downrated.
[SYS.2.RL.8] If analysis of system requirements regarding technical feasibility is covered by
effective risk management, then SYS.2.BP3 shall not be downrated.
[SYS.2.RL.9] If analysis results of system requirements regarding impact on estimates is not
consistently used by project management (MAN.3), then SYS.2.BP3 shall not be downrated.

---

<!-- Page 96 -->

3.4.2.4 Traceability and consistency
System requirements are derived from stakeholder requirements. During the process of analysis
of system requirements, inconsistencies between stakeholder requirements and system
requirements may occur as the customer does not always update his requirements.
Rating rules:
[SYS.2.RL.10] If a system requirement is no longer consistent with stakeholder requirements
because of a meaningful adaptation, but the stakeholder does not adapt his respective
requirement correspondingly and evidence of the agreement is available, then SYS.2.BP5 shall
not be downrated.
See also Section 3.3.1 of SYS.1 and section 2.3.4 here.
3.4.3 Rating rules with other processes at level 1
None.
3.5 SYS.3 System Architectural Design
The purpose is to establish an analyzed system architecture consistent with the system
requirements.
3.5.1 General information
The architecture is mainly nonfunctional requirementsdriven, and system architectural design
decisions may lead to iterative system requirements rework. This can be the case if e.g., it is
discovered that two nonfunctional requirements cannot technically be met at the same time.
Example:
A signal shall be processed by the system with a cycle time of 10 msec, while throughput is
limited to 1000 bus messages per minute (resulting best-case in 60 msec per bus message).
3.5.1.1 Specifying a system architecture
The system architectural design is the highest level of a design description of the system
encompassing a collection of views dealing with different aspects (e.g., static structure,

---

<!-- Page 97 -->

functional decomposition dynamics etc.) These views are architecture visualizations that are
required for communication, discussion, reviews, analysis, evaluation, planning, change request
analysis, impact analysis, maintenance etc. of the system.
There is no common definition of which views are required and no criteria for the completeness
of such views. However, essential views are:
1. (at least one) static view providing an overview of the structure; and
2. (at least one) dynamic view describing the designated behavior behind system
functionalities.
In most cases the system architectural design is a graphical representation of the system
supplemented by textual explanations.
Static system architecture views allow the recursive decomposition of the system into
manageable elements with high cohesion and low coupling. This decomposition supports the
assignment of requirements to the architectural elements and will help the organization to
distribute the work. An architectural design may need to include elements that are developed
externally, e.g., platform, third-party parts, COTS etc.
At the stage of system architectural design, the allocation may reasonably be done at the level
of suitable requirement clusters (e.g., a chapter representing a system service or use case in a
requirements specification) but not necessarily at the level of a single requirement.
3.5.1.2 A single BP for designing an architecture
The former BPs 1, 2 and 3 of SYS.3 (and SWE.2) in Automotive SPICE v3.1 have been integrated
into one, respectively.
Reasons:
The former BP1 required creating an "architecture". The three pillars on which any architecture
resides are:
1. (at least one) structural view with interdependencies and behavioral descriptions of elements
2. a set of interfaces
3. the description of dynamic behavior and interactions.
However, having additional BPs to cover the abovementioned architectural aspects (2.) and (3.)

---

<!-- Page 98 -->

while BP1 holistically talking about "architecture" can be confusing, e.g., a rating of BP1 as F (i.e.,
the architectural design is complete and adequate) while rating BP3 lower (i.e., in case of
inadequate or incomplete dynamic modelling).
3.5.1.3 Analysis of the system architecture (BP3) vs. SYS.4
Note for SYS.3.BP3, it explains that techniques for analyzing the system architectural design can
be e.g., prototyping, simulations, or qualitative analyses (e.g., FMEA approaches). This might
raise the questions whether SYS.3.BP3 and SYS.4 are somewhat redundant, and if the process
purposes SYS.3 and SYS.4 are overlapping. However, this is not the case, because:
• SYS.4 verifies if a given physical sample reveals the characteristics defined by the system
design. This means, the "object-undeㄱverification" is the physical sample.
• In contrast SYS.3.BP3 determines whether the system architectural design itself, i.e., whether
the documented information, is appropriate. This means, the "object-undeㄱanalysis" is not a
physical sample but the documentation representing the design decisions.
3.5.2 Rating rules within the process
3.5.2.1 Analyzing the system architecture
The following BP has been introduced in SYS.3 (and similarly in SWE.2)
SYS.3.BP3: Analyze system architecture. Analyze the system architecture regarding relevant
technical design aspects related to the product lifecycle, and to support project management
regarding project estimates, and derive Special Characteristics for hardware elements.
Document a rationale for the system architectural design decision.
in order to be able to reflect e.g.
• cybersecurity, such as vulnerability analyses
• Functional Safety, such as safety analyses and dependent failure analyses according to ISO
26262 [ISO26262]
• robustness needs for nonsafety and noncybersecurity products.
The reason for having associated this BP with the supporting of project management regarding
project estimates is the following: revising system architectural solutions because of an
architectural analysis may (re)define the scope of work. Once this solution is settled, SYS.4 will
select verification measures for addressing exactly that solution space. This is to say, SYS.4 itself
does not change that solution space, and therefore does not alter the overall project's scope of

---

<!-- Page 99 -->

work.
Rating rules:
[SYS.3.RL.1] If nonquantitative analysis approaches or techniques are used and adequate but no
quantitative ones, then SYS.3.BP2 shall not be downrated.
3.5.2.2 Traceability and consistency
See also section 3.3.1 of SYS.1 and section 2.3.4 here.
3.5.3 Rating rules with other processes at level 1
None.
3.6 SYS.4 System Integration and Integration Verification
The purpose is to integrate systems elements and verify that the integrated system elements
are consistent with the system architecture.
3.6.1 General information
3.6.1.1 Why no "production data compliant sample" BP in SYS.4/
SYS.5
The processes HWE.3 and HWE.4 include such a BP because hardware production data
compliance does not automatically imply design compliance. In contrast, SYS.4 and SYS.5 do not
have such a BP as there is no corresponding notion of 'system production data'. Further, the
process purposes of SYS.4 and SYS.5 are about evidencing that a sample is compliant with the
design and requirements, respectively. Therefore, a "production data compliance sample" BP in
SYS.4/SYS.5 would be redundant with these process purposes.
3.6.1.2 Specify verification measures for system integration
SYS.4.BP1 requires the identification of the necessary verification infrastructure and environment
setup. This may be supported using simulation of the environment such as hardwareintheloop
simulation, vehicle network simulation, digital mock-up.
Verification results can support the update of simulation models.

---

<!-- Page 100 -->

3.6.1.3 Selecting verification measures
Evidencing the selection of verification measures could be achieved by e.g.:
• a document depicting the release content, including a list of verification measures to be done
for it
• a meeting with the verification personnel and e.g., a person responsible for the system design.
3.6.1.4 Analysis of the system architectural design (BP3) vs. SYS.4
See section 3.20.1.3.
3.6.2 Rating rules within the process
3.6.2.1 Verification measure definition
Rating rules:
[SYS.4.RL.1] If entry/exit criteria are reasonably specified for a set of verification measures
instead of each individual verification measure, then SYS.4.BP1 shall not be downrated.
3.6.2.2 Automation of verification measures
Rating rules:
[SYS.4.RL.2] If a verification measure is automated and the correctness, completeness, and
consistency of the corresponding scripts and programs are not addressed in the verification
measure definition, then SYS.4.BP1 shall be downrated.
3.6.2.3 Explorative testing vs. traceability/consistency
The state of the art testing does not only comprise testing derived from requirements, but also
exploratory testing based on experience, such as "error guessing based on knowledge". This is
valuable as it adds to the quality of the product. Therefore, exploratory tests that are based on
experience cannot, by definition, be traced to the system requirements.
Still, traceability is needed between explorative test cases and their results.

---

<!-- Page 101 -->

Rating rules:
[SYS.4.RL.3] If verification measures represent explorative tests, which, by definition, cannot be
traced to the system architectural design, then SYS.4.BP4 shall not be downrated.
3.6.2.4 Traceability and consistency
See also section 3.3.1 of SYS.1 and Section 2.3.4 here.
3.6.3 Rating rules with other processes at level 1
3.6.3.1 Verification measures selection vs. release plans
Rating rules:
[SYS.4.RL.4] If selection of verification measures is properly done but based on an inadequate or
incomplete release plan, then SYS.4.BP2 shall not be downrated.
3.7 SYS.5 System Verification
The purpose is to ensure that the system is verified to be consistent with the system
requirements.
3.7.1 General information
3.7.1.1
Why no "production data compliant sample" BP in SYS.4/ SYS.5
See section 3.6.1.
3.7.1.2 Specify system verification measures
SYS.5.BP1 requires the identification of the necessary verification infrastructure and environment
setup. This may be supported using simulation of the environment such as hardwareintheLoop
simulation, vehicle network simulation, digital mock-up.
Verification results can support the update of simulation models.

---

<!-- Page 102 -->

3.7.2 Rating rules within the process
3.7.2.1 Verification measure definition
Rating rules:
[SYS.5.RL.1] If entry/exit criteria are reasonably specified for a set of verification measures
instead of each individual verification measure, then SYS.5.BP1 shall not be downrated.
3.7.2.2 Automation of verification measures
Rating rules:
[SYS.5.RL.2] If a verification measure is automated and the correctness, completeness, and
consistency of the corresponding scripts and programs are not addressed in the verification
measure definition, then SYS.5.BP1 shall be downrated.
3.7.2.3 Explorative testing vs. traceability/consistency
The state of the art testing not only comprises testing derived from requirements but also
explorative testing based on experience, such as "error guessing based on knowledge". This is
valuable as it adds to the quality of the product. Therefore, explorative tests that are based on
experience cannot, by definition, be traced or consistent with the software requirements.
Still, traceability is needed between explorative test cases and their results.
Rating rules:
[SYS.5.RL.3] If for those verification measures which represent exploratory tests, no traceability
to the system requirements is available, then SYS.4.BP4 shall not be downrated.
3.7.2.4 Traceability and consistency
See also section 3.3.1 of SYS.1 and section 2.3.4 here.
3.7.3 Rating rules with other processes at level 1

---

<!-- Page 103 -->

3.7.3.1 Verification measures selection vs. release plans
Rating rules:
[SYS.5.RL.4] If selection of verification measures is properly done but based on an inadequate or
incomplete release plan, then SYS.5.BP2 shall not be downrated.
3.8 SWE.1 Software Requirements Analysis
The purpose is to establish a structured and analyzed set of software requirements consistent
with the system requirements and the system architecture.
3.8.1 General information
3.8.1.1 Iterative vs. incremental development
Normally the functional content in the product changes iteratively and evolves incrementally
across releases. The term "increment" can be understood as adding a feature or element that did
not exist before (analogy: building a house). The term "iteration" can be understood as refining,
or adapting, an existing feature or element (analogy: a sculptor working on a sculpture).
Therefore, the complete set of requirements of the final end product does not necessarily have
to be available at the project start. Rather, release scopes agreed with the customer will define
increments and iterative rework. In this respect, requirements creation can be driven by release
definitions over time.
3.8.1.2 Impact on the operating environment
SWE.1.BP1 specifies the requirements for the software under consideration alone, i.e., the ones
the software shall implement. In contrast, BP4 asks for the impact and consequences the
software has on its operating environment because of those requirements. Its meaning denotes
anything outside, i.e., beyond, the boundary of the software under consideration in SWE.1.
Elements in the operating environment such as
• human users e.g., in case of infotainment systems
• the target on which the software is running
• stress, distraction, discomfort or fatigue as a result of poorly designed or oveㄱdesigned HMIs.
Such impact on the operating environment needs to be communicated back in order to be able
to make changes. Otherwise, this impact may be used to iterate the requirements of the software
under consideration.

---

<!-- Page 104 -->

3.8.2 Rating rules within the process
3.8.2.1 Software development without system requirements
In case of software development only, the software requirements may refer directly to the
stakeholder requirements. Consequently, consistency and bidirectional traceability have to be
ensured between stakeholder requirements and software requirements.
Rating rules:
[SWE.1.RL.1] In the case of software development only, if the traceability and consistency from
software requirements to stakeholder requirements are established then SWE.1.BP5 shall not be
downrated.
[SWE.1.RL.2] If some software requirements are not derived from system requirements but from
platform or product line requirements and are not in contradiction to other requirements, then
SWE.1.BP1 shall not be downrated.
[SWE.1.RL.3] If software requirements are not derived from system requirements but from
stakeholder requirements which do not affect system requirements or the system architecture
and this is agreed with software and system representatives, then SWE.1.BP1 shall not be
downrated.
3.8.2.2 Structuring of requirements
Software requirements can be grouped or categorized to support an overview and prioritization.
See also section 2.3.3.2 here.
Rating rules:
[SWE.1.RL.4] If "functional" and "nonfunctional" are the only requirements categorization or
classification criterion, then SWE.2.BP2 shall be rated as N.

---

<!-- Page 105 -->

3.8.2.3 Requirements mapping to releases
A possible approach to prioritizing requirements is the allocation of requirements to releases. The
usage of such an approach will imply that the content of the next and future releases is defined.
Rating rules:
[SWE.1.RL.5] If there is no evidence for prioritization other than a separate release plan
consistently mapping software requirements to future releases then SWE.1.BP2 shall not be
downrated.
[SWE.1.RL.6] If the software requirements that are mapped to a particular release do not match
with the system requirements mapped to the same release then SWE.1.BP2 shall be downrated.
3.8.2.4 Analysis of requirements
See also section 3.3.1 of SYS.1.
The indicator SWE.1.BP3 requires
"Analyze software requirements. ...and to support project management regarding project
estimates". This means for example:
• A set of 100 requirements exists. An analysis was done together with the project manager
during a project progress meeting. As a result, 40 out of the 100 requirements were decided
not to be considered, therefore being attributed as "rejected" with an accompanying comment
providing expectations.
• A set of 10 requirements were planned for the next release. The development team reports
to the project manager that this is no longer feasible due to resource constraints. The decision
is to not change the status of those 10 requirements but to reallocate them to future releases.
This can be evidenced by a comparison of the release plans (which is the process context of
MAN.3 but not SWE.1).
Analysis of requirements can be done by means of using by e.g., tool-based attributes, or
comments added to the requirements text.
The analysis of software requirements is the basis for a correct implementation. Even though
requirements sometimes appear very simple, a well-founded analysis has to be conducted for
those requirements. The scope and appropriateness of the analysis depends on the context of
product (e.g., platform). The result of analysis can vary from a-

---

<!-- Page 106 -->

simple attribute to a complex simulation or the building of a demonstrator to evaluate the
feasibility of software requirements.
The reason for having associated this BP with the supporting of project management regarding
project estimates is the following: revising software requirements by means of an analysis may
(re)define the scope of work. Once this solution is settled, SWE.6 will select verification
measures for addressing exactly that problem space. This is to say, SWE.6 itself does not change
that problem space, therefore does not alter the overall project's scope of work.
Rating rules:
[SWE.1.RL.7] If analysis results of requirements are not demonstrated by means of separate
analysis reports or review records but by means of e.g., tool-supported attributes or tool-
supported commenting, then SWE.1.BP3 shall not be downrated.
[SWE.1.RL.8] If the analysis of software requirements in regards to technical feasibility is covered
by risk management then SWE.1BP3 shall not be downrated.
[SWE.1.RL.9] If analysis results of software requirements in regards to impact on estimates is
not consistently used by project management then SWE.1.BP3 shall not be downrated.
3.8.2.5 No redundant traceability paths
SWE.1.BP5 offers the possibility of having two paths for traceability:
a) between software requirements and the system architecture (SYS.3)
b) between software requirements and system requirements (SYS.2)
However, redundancy, i.e., using the two traceability paths for the very same software
requirement at the same time, is neither intended by this BP nor meaningful. Further, it is not
intended to express that all, or the majority of the, software requirements should be traced to
system requirements directly as a default. Which path appears more appropriate must depend
on the actual content of the software requirement itself.
Example 1: system requirements → system architecture →
software requirements
Consider the system requirements demanding a particular and coherent system service. As an
architectural solution, different parts of software run on different microcon

---

<!-- Page 107 -->

trollers or (maybe including dual core microcontrollers) on e.g., different PCBs. Traceability
between software requirements and system architecture would be needed here
• in order to allocate different software behavior to the different microcontrollers
• as there are different communication mechanisms in between the different pieces of software.
Example 2: system requirements software requirements
The system interface requirements define a particular CAN matrix to be used. Such requirements
can be traced to corresponding software requirements directly.
Rating rules:
[SWE.1.RL.10] If traceability is established for one path only but not for the other redundant path,
SWE.1.BP5 shall not be downrated.
3.8.2.6 Traceability and consistency
See also section 3.3.1 of SYS.1 and section 2.3.4 here.
3.8.3 Rating rules with other processes at level 1
3.8.3.1 PA 1.1 of SWE.1 vs. other processes
None.

---

<!-- Page 108 -->

3.9 SWE.2 Software Architectural Design
The purpose is to establish an analyzed software architecture, comprising static and dynamic
aspects, consistent with the software requirements.
3.9.1 General information
3.9.1.1 The aim of software architectural design
Automotive SPICE emphasizes that requirements are to be systematically broken down into lower
levels via design decisions at the respective levels. The idea behind that is
a) not to get overwhelmed with too much information thereby making mistakes ("divide
and conquer" principle)
b) providing software documentation for future staff so that they do not have to
inefficiently learn how the software works from the potentially massive source code
c) making sure implicit knowledge is not lost in the documentation, and in the final
product
d) to ensure that the requirements at the respective level are completely covered e) there,
finally, is no superfluous software element (ie., the SW does not contain more than the
requirements require)
Also recall here the general legal obligation to produce supporting documents, product liability
risks etc.
In this respect, the software architectural design supports the above mentioned expectations by
describing the realization solution for the software requirements.
3.9.1.2 Software architectural design
Beyond a static and a dynamic view, there is no common definition which views are required and
no criteria for the completeness of the sum of views. The number and kind of views highly
depends on the size and complexity of the product. There are some approaches in the industry
that specify the kind of information that is required for the view ("viewpoints" which are
collections of patterns, templates, and conventions for constructing one type of view) and the
integration of the views in a complete architectural design description.

---

<!-- Page 109 -->

In most cases the software architectural design is a graphical representation of the software
supplemented by textual explanations.
Static software architecture views allow the decomposition of the software into manageable
elements with high cohesion and low coupling. This decomposition supports the assignment of
requirements to these architectural elements and will help to organize the distribution of the work
packages to the developers. Architectural elements of the software that are developed external
to the assessment scope (e.g., opensource software, platform software, third-party software,
etc.) are also to be included as dedicated elements in the software architectural design and have
to be considered as well for interface analysis, dynamic behavior, resource consumption
objectives etc.
As appropriate the architectural elements are detailed further in the architectural design down to
the components as the lowest level elements. The components consist of one or more units and
are subject of the software detailed design process (SWE.3) (see "Annex C Terminology" of the
PAM for definition of the terms element and component).
3.9.1.3 Regarding interrupts
Although, according to the state of the art, interrupt service routines shall not contain any domain
logic behavior or complex algorithms, interrupt handling still represents parallel control or even
data flows. Especially high interrupt loads may cause interferences in the application.
Therefore, Automotive SPICE v4.0 considers it important to treat relevant interrupt handling as
software units in order to reflect them in the software design, and the dynamic design in
particular.
3.9.2 Rating rules within the process
Rules for rating consistency between the BPs in this process are not defined. This is due to the
nature of BPs as describing separate concerns which shall be addressed individually. Further, a
Process Attribute shall be rated based on the Process Performance Indicators, i.e., not based on
a subset.

---

<!-- Page 110 -->

3.9.2.1 Analyzing the system architecture
The following BP has been introduced in SWE.2 (and similarly in SYS.3)
SWE.2.BP3: Analyze software architecture. Analyze the software architecture regarding relevant
technical design aspects and to support project management regarding project estimates.
Document a rationale for the software architectural design decision.
in order to be able to reflect e.g.
• cybersecurity, such as vulnerability analyses
• Functional Safety, such as safety analyses and dependent failure analyses according to ISO
26262 [ISO26262]
• robustness needs for nonsafety and noncybersecurity products.
The reason for having associated this BP with the supporting of project management regarding
project estimates is the following: revising software architectural solutions because of an
architectural analysis may (re)define the scope of work. Once this solution is settled, SWE.5 will
select verification measures for addressing exactly that solution space. This is to say, SWE.5
itself does not change that solution space, therefore does not alter the overall project's scope of
work.
Rating rules:
[SWE.2.RL.1] If nonquantitative analysis approaches or techniques are used and adequate but
no quantitative ones, then SWE.2.BP2 shall not be downrated.
3.9.2.2 Traceability and consistency
See also section 3.3.1 of SYS.1 and section 2.3.4 here
3.9.3 Rating rules with other processes at level 1
None.

---

<!-- Page 111 -->

3.10 SWE.3 Software Detailed Design and Unit Construction
The purpose is to establish a software detailed design, comprising static and dynamic aspects,
consistent with the software architecture, and to construct software units consistent with the
software detailed design.
3.10.1 General information
3.10.1.1 The aim of a software detailed design
Firstly, see subsection "3.9.1.1 The aim of software architectural design" for SWE.2.
The detailed design is a step in between the software architecture and the implementation in the
source code. It makes the software even more comprehensible thus further contributing to
knowledge documentation. Furthermore, it helps to break down the software architectural
solution into smaller pieces that are easier to understand, to implement, and to verify ("divide
and conquer" principle). Without a detailed design the step from requirements to the code level
would still be too big, involving the risk of losing software understanding for others, and impacting
maintainability. Therefore, detailed design abstracts from, and drives, the source code. The
detailed design is not a mere graphical representation of the source code logic.
3.10.1.2 Detailing out software components
The software detailed design refines the components specified in the software architectural
design process into software units and their interfaces. These software units that are not further
refined on the design level and their interfaces are the basis for generating or developing the
source code for the derived software units.
The detailed design for a component describes the approach to satisfy the mapped software
requirements by describing how software units will be organized both statically and dynamically.
This includes describing how different software units will interact.
During assessments it was often observed that software units often lacked a description of their
own intended technical or domain knowledgeoriented behavior. Apparently, the Automotive
SPICE v3.1 texts...

---

<!-- Page 112 -->

SWE.3.BP1 "Develop a detailed design ...was often incompletely interpreted as
for each software component... that the mere identification of software units.
specifies all software units..."
SWE.3.BP2 "Define interfaces of soft ...was often interpreted as the mere
ware units" signature of software units.
SWE.3.BP3: "... Evaluate the inter ...was often interpreted as mere call
action between ...software units." graphs of software unit interfaces.
For these reasons, Automotive SPICE 4.0 now uses more explicit verbs and terms in BPs:
• SWE.3.BP1:... For each software component specify the behavior of its software units, their
static structure and relationships, their interfaces including...
• SWE.3.BP2:... Specify and document the dynamic aspects of the detailed design.
3.10.1.3 Views on software detailed design
Detailed design comprises at least a static and a dynamic view. There is no common definition
which views are required and no criteria for the completeness of the sum of views. There are
approaches in the industry that specify the kind of information that is required for the other
("viewpoints" which are collections of patterns, templates, and conventions for constructing a
type of view) and the integration of the views in a complete detailed design description.
In most cases the software detailed design is a mix of graphical representation and
comprehensive textual explanations.
3.10.1.4 What a "software unit" is
In the first place, "software unit" is not an implementationlevel term but a logical modeling-level
term (see SWE.3.BP1). The logical modeling level represents the detailed software design, and
a detailed software design is always a semantical abstraction from the source code but not
identical with the source code itself. Further, the software architectural design and detailed
design are created using the application domain language and entities. Consequently, the view
of a software unit being an "inseparable coherent piece of behavior" that is also "verifiable
standalone" makes it an application domain knowledge perspective in the first place. This is
independent of
• how many C functions will realize the software unit
• of the *.h and *.c files the software units are finally "physically" represented.

---

<!-- Page 113 -->

Examples:
a) A motor driver *.c file with several C (sub)functions transforming logical motor
commands into IO signals (for the direction of rotation and for PWM/duty cycles for
setting the motor speed) can be considered a software unit. A "motor driver" is an
application domain entity name with exactly that coherent expected behavior.
b) A single C function implements a UML state machine (that is defined for a software
Unit in the design model) by means of several switch-case statements (see Example 2
in subsection "3.11.1.1 The purpose of code coverage"). This single C function can be
considered a software unit as, still, it includes the considered application domain
behavior.
In both examples, at the code level these software units may of course be further divided up into
many smaller C functions or even *.c files. In example (b.) specifically all behavior in a caseblock
might be factored out into their own C subfunctions which makes sense. However, doing so
does not change the fact that, from the application domain knowledge perspective, the software
unit is still the sum of all those subfunctions.
A software unit shall be verified against its specification provided in the detailed design (and not
against the source code itself). Therefore, carrying such decomposition too far, however, may
even introduce code review inefficiency when having to switch between many code files.
As a result, it can be concluded that a software unit can be either, a single subroutine or a number
of subroutines, e.g., a single C function but also an entire *.c file containing several C functions,
and that the decision of a software unit boundary must, also, be application domaindriven.
3.10.1.5 Code metrics vs. software unit boundaries
A further consequence of the fact that source code only represents an implementation solution
for a software unit specification in the detailed design, code complexity metrics are a not a driver
for determining a software unit boundary.

---

<!-- Page 114 -->

3.10.1.6 Traceability and consistency
Firstly, see also section 3.3.1 of SYS.1, and section 2.3.4 on traceability for clusters of information.
Generally, it is necessary to understand which software requirement is, finally, represented in
the detailed design. Reasons are e.g.,
• comprehension of the logic of the software
• efficient impact analysis in the context of changes
• proof that there is no dead code
• all software requirements are covered.
For that purpose, during software requirements analysis the two following traceability options
can be considered, depending on the actual content of the requirement:
Option A:
Traceability via software architecture.
Realizing a requirement that requires dynamic behavior and interactions between software
components and, consequently, their software units.
Example:
Consider the software requirement:
"The SW shall write to the MOTOㄱPOWERING-IO the command START in 60[ms] with a
tolerance of +/2[ms] when it has detected a bus frame content in RECEIVING-IO and the SW is
in state OPERATIONAL"
This requirement represents a coherent software service, however many SW components and
units will be involved Traceability via the static design model (i.e., references between that
requirement and each of the individual components/units) may result in an overwhelming
number of links; further, such a set of links to individual static elements is rather inconclusive in
regards to judging requirement coverage, and consistency. In contrast, looking at a sequence
through the components/units allows judging whether the requirement actually is completely and
consistently satisfied (see Figure 3-2).

---

<!-- Page 115 -->

Figure 3-2 Traceability and consistency between SW requirements and SW components and SW
units via dynamic interaction models
The advantage of this approach is even maximized if
• atomic Individual requirements are grouped to represent coherent end-2-end sys
－tem/software services, i.e., use cases
• and then modelling a sequence of software/systeminternal behavioral flow behind the uses
cases. This further minimizes the number of traceability links or references while maintaining
consistency.
Option B:
Traceability between a particular software requirement and a software detailed design element.
Example: CAN matrix
Software interface requirements may demand using a defined CAN matrix. Since there will be
e.g., a particular set of software units decoding such messages, direct traceability may be
intuitive.
Automotive SPICE 4.0 SWE.3.BP only demands "...consistency and... traceability between the
SW detailed design and the SW requirements", but not to individual SW

---

<!-- Page 116 -->

units in the detailed design or code directly (as opposed to Automotive SPICE v3.1). Therefore,
creating dynamic models such as UML/SysML Sequence or Activity Diagrams, and assigning it
to the requirement, does represent traceability to SW components and SW units, see Figure 3-
2. Further, in practice the term "software unit" may sometimes erroneously be interpreted as the
implementation of the software unit in source code. This interpretation, however, is not intended
because the source code is the implementation solution of a software unit specified in the
detailed design.
3.10.1.7 Strengthening of 'SWE.3.BP3 Develop Software Units'
In SWE.3, BP3 emphasizes principles according to which the code is to be developed, i.e.,
reflecting such principles at coding time already. In fact, there are coding principles that can be
expected at CL1. Note 7 in SWE.3 suggests that such coding principles are e.g., "no implicit type
conversions", "one entry and one exit point in subroutines", and "range checks" or general
designby-contract. Further, coding principles that can be considered at CL1 relate to the robust,
erroㄱfree and technically correct behavior of the final software product. Consequently, in SWE.4
software unit static verification and code reviews, respectively, can then also verify whether
those coding principles have been adhered to.
Examples for coding principles that can be expected at CL1:
• no implicit type conversions
(to avoid value range undeㄱ/overflows)
• one entry and one exit point in subroutines
(to avoid systematic faults)
• encapsulation at the code level as opposed to e.g., global visibility of variables
(to avoid systematic faults)
defensive programming to mitigate systematic faults, e.g.
- range checks or general designby-contract
- an 'enum' in C, the values of which being initialized with a certain Hamming distance to
increase robustness against memory corruption.
This supports the consideration of coding principles at an earlier point in time from a development
lifecycle perspective.

---

<!-- Page 117 -->

Note that this strengthening is not to introduce redundancy, nor is it overlapping, with CL2. Other
coding principles that are to be considered in regards to GP 2.2.1 are ones that are not generally
necessary because they depend on the specific assessed context. The following examples for
coding principles depending on the product business strategy such as platform development
could be expected at CL2:
• maintainability and comprehensibility by means of e.g., naming conventions and commenting
templates
• portability
• scalability
• reusability
as opposed to a context which is about developing and maintaining a very customeㄱspecific
legacy product for only one particular application; none of the abovementioned principles would
necessarily apply.
A further advantage of strengthening SWE.3.BP2 is that it should now receive a greater attention
by assessors. Previously, during assessments this BP was often rated as F based on the mere
existence of code.
3.10.2 Rating rules within the process
3.10.2.1 Boundary of a software unit
Rating rules:
[SWE.3.RL.1] If a software unit in the detailed design is represented in the code by a cluster of
programming language (sub)routines but not by single atomic (sub)routines then SWE.3.BP1 and
SWE.3.BP3 shall not be downrated.

---

<!-- Page 118 -->

3.10.2.2 Code metrics vs. programming language routine
boundaries
Another consequence of the above is that code complexity metric results are not always a valid
reason to determine the size and structure of programming language (sub)routines that
implement the software unit. Particularly, considering one single code metric alone for such a
purpose should be avoided.
Example: complexity according to McCabe2
=
Original assumption: a value of MMcCabe > 10 is less comprehensible for programmers, testers,
and reviewers, and has a higher likelihood of systematic faults. However, this assumption cannot
be considered generally true: code sample (a), below, reveals MMcCabe 14 while code (b) reveals
MMcCabe 3. However, code (b) is more comprehensible and therefore maintainable than code
(b). Further, it is not obvious why code sample (a) should be divided up further into smaller code
pieces for the sole purpose of reducing MMcCabe•
(a) MMcCabe = 14
const String getMonthName (const int number)
{
String result;
switch (number)
{
case 1: result "Jan"; break;
case 2: result "Feb"; break;
...
case 12: result = "Dec"; break;
default: result = "unknown month";
}
return result;
};

---

<!-- Page 119 -->

(b) MMcCabe = 3
const String getMonthName (const int number)
{
string[] months new string[]
{
"Jan",
"Feb",
…
"Dec"
};
char result[] = "unknown month";
if ((number >= 1) && (number <= sizeof (months)))
{
result months [number 1];
}
return result;
};
Therefore, a combination of selected code metrics will provide meaningful hints on where
refactoring should, or should not, be discussed in order to
• achieve "clean", comprehensible, and maintainable code.
• decide on the necessity of particular software unit verification measures
(see SWE.4).
This also means that should such a code metric combination exceed a defined combined target
but should there justifiably still be no didactical or conceptual advantage in connection with the
application domain knowledge and terminology, then the software unit boundary should not be
redefined. Note however that this shall not be an excuse for unstructured code fragments.
Rating rules:
[SWE.3.RL.2] If code metric targets for a programming language (sub)routine are formally violated
but there are reasonable context-specific arguments why the size and boundary of that routine
are acceptable, then SWE.3.BP1 shall not be downrated.

---

<!-- Page 120 -->

3.10.2.3 Dynamic behavior
For the description of the internal behavior of the software units, graphical representations (e.g.,
UML) and/or textual explanations abstracting from the implemented source code are to be used.
Rating rules:
[SWE.3.RL.3] If a software unit is of such a low complexity from the technical application domain
knowledge perspective that its dynamic behavior can be adequately described in text without
use of a graphical notation, and only such a textual explanation is available, then SWE.3.BP2 shall
not be downrated.
3.10.3 Rating rules with other processes at level 1
None.
3.11 SWE.4 Software Unit Verification
The purpose is to verify that software units are consistent with the software detailed design.
3.11.1 General information
Software unit verification covers not only software unit testing aspects but also unit verification
aspects such as static verification of units.
3.11.1.1 The purpose of code coverage
As is clear from SWE.3 and SWE.4, the implementation of a software unit in the source code
level shall be verified against the unit specification in the detailed design. A software unit's source
code level shall not be verified against the code itself as this does not prove if the unit works
correctly according to the application domain logic. This would just prove that the code works as
programmed, or that the compiler works correctly.
A recurring question is whether during SWE.4 a 100% code coverage (e.g., statement coverage,
branch coverage, MC/DC coverage) of the unit shall be achieved.

---

<!-- Page 121 -->

Answer:
Generally, the purpose is not to achieve a 100% coverage of all software unit code as a verification
objective on its own. The purpose rather is to check if a particular test case did touch exactly
those parts in the software unit code it was supposed to, based on the test case purpose and
definition. In other words, code coverage represents accompanying information that helps
judging completeness of the selected test cases. This means that code coverage alone, in itself,
is not a verification objective. See also ISO 26262-6:2018 [ISO26262], clause 9.4.4 here.
In Example 1 below, when testing stateTransition1() with the aim of checking whether the state
change is performed entirely and correctly, a code coverage of 100% is expected. The reason is
that in Example 1 each single state transition is represented by its own C++ method.
In Example 2 below, however, when testing stateChange() with the same goal of checking
whether the state change for MY_EVENT1 is performed entirely and correctly, a code coverage
of <100% is expected. The reason is there is only one single C++ method including all state
changes represented by the various switch-case branches; therefore, the code relevant for
MY_EVENT1 is only a subset of the code.
This is one of the reasons why SWE.4.BP2 requires a selection of unit test cases, supported by
SWE.3.BP1 Note 1 stating that "a software unit in the detailed design may be, at the code level,
represented by a single subroutine (e.g., Example 2) or a set of subroutines (e.g., Example 1)".
Example 1: possible state machine implementation for a class
Context
# m_state
+ stateTransition10)
+ stateTransition20
void stateTransition1() void stateTransition2()
{ {
If(STATE_A == m_state) If(STATE_A == m_state)
{ {
exit CURRENT_STATE(); exit_CURRENT_STATE();
state = NEXT_STATE; state = NEXT_STATE;
entry_NEXT_STATE(); entry_NEXT_STATE();
do_NEXT_STATE(); do_NEXT_STATE();
} }
}; };
Example 2: alternative state machine implementation

| Context |
| --- |
| # m_state |
| + stateTransition10)
+ stateTransition20 |

---

<!-- Page 122 -->

Context
# m_state
state change (eventName)
void state_change (possibleEventsEnum event) {
switch (m_state)
{
case <stateName1>:
if (MY_EVENT1 == event)
{
exit <stateName1>( );
m state = <stateName4>;
entry_ <stateName4>( );
do_ <stateName4>( );
}
break;
case <stateName2>:
if (MY_EVENT2 = event)
{
exit <stateName2>( );
m state= <stateName6>;
entry <stateName6>( );
do <stateName6>( );
}
break;
default://invalid state
};
3.11.2 Rating rules within the process

| Context |
| --- |
| # m_state |
| state change (eventName) |

---

<!-- Page 123 -->

3.11.2.1 Define software unit verification measures
Rating rules:
[SWE.4.RL.1] If it is made reasonably plausible based on context-specific arguments that a
particular verification measure is not necessary, then SWE.4.BP1 shall not be downrated.
3.11.2.2 Automation of verification measures
Rating rules:
[SWE.4.RL.2] If a verification measure is automated and the correctness, completeness, and
consistency of the corresponding scripts and programs are not addressed in the verification
measure definition then SWE.4.BP1 shall be downrated.
3.11.2.3 Explorative testing vs. traceability/consistency
The Rating rules: not only comprises testing derived from requirements but also explorative
testing based on experience, such as "error guessing based on knowledge". This is valuable as it
adds to the quality of the product. Therefore, explorative tests that are based on experience
cannot, by definition, be traced or consistent with the software requirements.
Still, traceability is needed between explorative test cases and their results.
Rating rules:
[SWE.4.RL.3] If verification measures representing explorative tests, which, by definition, cannot
be traced to the detailed design, have no such traceability then SWE.4.BP4 shall not be
downrated.
3.11.2.4 Traceability and consistency
See also section 3.3.1 of SYS.1 and section 2.3.4 here.
3.11.3 Rating rules with other processes at level 1
3.11.3.1 Verification measures selection vs. release plans
Verification measure selection can technically be done properly based on technical expertise with
respect to the software product and design and based on experience. This may be the case even
if the project's release content is not well-defined.

---

<!-- Page 124 -->

Rating rules:
[SWE.4.RL.4] If selection of verification measures is properly done but based on an inadequately
or incompletely defined release content, then SWE.4.BP2 shall not be downrated.
3.12 SWE.5 Software Component Verification and Integration
Verification
The purpose is to verify that software components are consistent with the software architectural
design, and to integrate software elements and verify that the integrated software elements are
consistent with the software architecture and software detailed design.
3.12.1 General information
3.12.1.1 The scope of SWE.5
For understanding the concepts of software unit integration and the standalone verification of
software components see Section 2.4.
The term "integrated software" as used in the context SWE.5 refers to the sole technical software
product, or sample, on which verification is performed. This term alone therefore
• does not address documentation,
• nor does it imply that SWE.4 must have been done prior to SWE.5 as a PAM does not represent
a lifecycle model.
3.12.2 Rating rules within the process
3.12.2.1 Verification measure definition
Rating rules:
[SWE.5.RL.1] If entry/exit criteria are reasonably specified for a set of verification measures,
SWE.5.BP1 and SWE.5.BP2 shall not be downrated.

---

<!-- Page 125 -->

3.12.2.2 Automation of verification measures
Rating rules:
[SWE.5.RL.2] If a verification measure is automated and the correctness, completeness, and
consistency of the corresponding scripts and programs are not addressed in the verification
measure definition, then SWE.5.BP1 or SWE.5.BP2, respectively, shall be downrated.
3.12.2.3 Explorative testing vs. traceability/consistency
The state of the art testing not only comprises testing derived from requirements but also
explorative testing based on experience, such as "error guessing based on knowledge". This is
valuable as it adds to the quality of the product. Therefore, explorative tests that are based on
experience cannot, by definition, be traced or consistent with the software requirements.
Still, traceability is needed between explorative test cases and their results.
Rating rules:
[SWE.5.RL.3] If verification measures representing explorative tests, which, by definition, cannot
be traced to the architectural design, have no such traceability then SWE.5.BP6 shall not be
downrated.
3.12.2.4 Traceability and consistency
See also section 3.3.1 of SYS.1 and section 2.3.4 here.
3.12.3 Rating rules with other processes at level 1
3.12.3.1 Verification measures selection vs. release plans
Rating rules:
[SWE.5.RL.4] If selection of verification measures is properly done but based on an inadequate
or incomplete release plan, then SWE.5.BP3 shall not be downrated.

---

<!-- Page 126 -->

3.13 SWE.6 Software Verification
The purpose is to ensure that the integrated software is verified to provide evidence for
compliance with the software requirements using verification measures consistent with the
software requirements.
3.13.1 General information
The aim of software verification is to verify that the integrated software is consistent with the
software requirements, which means taking a black-box view of the software. The object-unde
ㄱverification is the integrated software, not the verification environment. This implies that any
verification environment can be applicable.
3.13.2 Rating rules within the process
3.13.2.1 Verification measure definition
Rating rules:
[SWE.6.RL.1] If entry/exit criteria are reasonably specified for a set of verification measures
instead of each verification measure, then SWE.6.BP1 shall not be downrated.
3.13.2.2 Automation of verification measures
Rating rules:
[SWE.6.RL.2] If a verification measure is automated and the correctness, completeness, and
consistency of the corresponding scripts and programs are not addressed in the verification
measure definition, then SWE.6.BP1 shall be downrated.
3.13.2.3 Explorative verification vs. traceability/consistency
The state of the art testing not only comprises testing derived from requirements but also
explorative testing based on experience, such as "error guessing based on knowledge". This is
valuable as it adds to the quality of the product. Therefore, explorative tests that are based on
experience cannot, by definition, be traced or consistent with the software requirements.

---

<!-- Page 127 -->

Still, traceability is needed between explorative test cases and their results.
Rating rules:
[SWE.6.RL.3] If verification measures representing explorative tests, which, by definition, cannot
be traced to the detailed design, have no such traceability then SWE.6.BP4 shall not be
downrated.
3.13.2.4 Traceability and consistency
See also section 3.3.1 of SYS.1 and section 2.3.4 here.
3.13.3 Rating rules with other processes at level 1
3.13.3.1 Verification measures selection vs. release plans
Rating rules:
[SWE.6.RL.4] If selection of verification measures is properly done but based on an inadequate
or incomplete release plan, then SWE.6.BP2 shall not be downrated.

---

<!-- Page 128 -->

3.14 VAL.1 Validation
The purpose is to provide evidence that the end product, allowing direct end user interaction,
satisfies the intended use expectations in its operational target environment.
3.14.1 General information
3.14.1.1
Motivation behind the process purpose
The process VAL.1 Validation centers around "intended use", thereby addressing the product's
end users. It therefore excludes looking at pure embedded software products, an ECU, or a drive
(comprising a motor and an ECU), none of which provides a direct end user interface.
In absence of legal requirements (e.g., a maximum closing force of 100N for window regulators,
or homologation requirements), the target expectations behind validation may be of an
explorative, or even subjective, nature.
Example 1: Automatic transmission as a mechatronic system
Meeting the defined geaㄱshifting time constraints is considered "verification" as these can
be measured objectively. In contrast, providing an adequate geaㄱshifting feeling is a
"validation" concern as it requires feedback from end users or their representatives.
Example 2: Automatic side door access systems
There are no legal closing force requirements. Therefore, how much closing force represents
of rubber seals etc. is a matter of "validation", e.g., by means of accident simulations. In
contrast, the angle at which the automatic door movement support is to be triggered is a
matter of decision which can be objectively measured, thus representing "verification".
Note that the possibility of being able to write up a requirement in the first place does not serve
as a distinction criterion for differentiating between verification and validation. This is to say, it is
not possible to argue it is about verification whenever one is able to specify a requirement.
Related to the two examples above, a requirement could still be written about:
1. defining certain max. acoustics and vibration to express a geaㄱshifting "feeling",
2. or a maximum closing force, respectively.

---

<!-- Page 129 -->

Still, determining whether or not these requirements are "adequate" would be a matter of
validation because they must be approximated. This is because of limitations, and the nature, of
requirements engineering in terms of dealing with potentially unidentified needs, or identification
of appropriate requirements only in an iterative manner.
3.14.2 Rating rules within the process
3.14.2.1 Validation measure definition
Rating rules:
[VAL.1.RL.1] If entry/exit criteria are reasonably specified for a set of validation measures instead
of each individual validation measure, then VAL.1.BP1 shall not be downrated.
3.14.2.2 Explorative validation vs. traceability/consistency
Explorative validation measures that are based on experience cannot, by definition, be traced or
consistent with stakeholder requirements.
Still, traceability is needed between explorative test cases and their results.
Rating rules:
[VAL.4.RL.2] If validation measures representing explorative tests, which, by definition, cannot
be traced to requirements, have no such traceability then VAL.1.BP4 shall not be downrated.
3.14.2.3 Traceability and consistency
See also section 3.3.1 of SYS.1 and section 2.3.4 here.

---

<!-- Page 130 -->

3.14.3 Rating rules with other processes at level 1
3.14.3.1 Validation measures selection vs. release plans
Rating rules:
[VAL.1.RL.3] If selection of validation measures is properly done but based on an inadequate or
incomplete release plan, then VAL.1.BP2 shall not be downrated.
3.15 MLE.1 Machine Learning Requirements Analysis
The purpose is to refine the machine learning-related software requirements into a set of ML
requirements.
3.15.1 General information
The Machine Learning Requirements Analysis process uses the software requirements that were
processed in the Software Requirements Analysis process and the elements of the software
architecture as an input.
Results of this analysis are specified functional and nonfunctional Machine Learning requirements
(ML requirements) including Machine Learning data requirements (ML data requirements).
3.15.2 Rating rules within the process
Since the ML requirements belong to the group of software requirements the rating
recommendations from SWE.1 "Software Requirements Analysis process" should be considered
here (see 3.8).
ML requirements are derived from the software requirements that are categorized to be
implemented in an ML based software element. ML requirements consist of ML data
requirements which are the main input for the SUP.11 Machine Learning Data Management and
other ML requirements which are input for the other MLE processes.

---

<!-- Page 131 -->

ML data requirements shall address:
• data characteristics to be covered and their expected properties (e.g., distributions,
accuracies, resolution, etc.)
• nonfunctional requirements (e.g., regarding labeling quality, integrity of data)
• structure, format and origin of ML data.
Other ML requirements should address:
• functional parts to be implemented for training and testing the ML model
• hardware related ML functions
• receiving signals from electronic sensors
• nonfunctional requirements for training and deployment (e.g., performance, quality
requirements).
ML requirements have to be granular, understandable, and verifiable. Unclear or geneㄱic
requirements have to be clarified with the system or software requirement owner.
Rating rules:
[MLE.1.RL.1] If data characteristics or nonfunctional requirements of the ML data requirements
are not addressed then MLE.1.BP1 shall not be rated higher than P.
3.16 MLE.2 Machine Learning Architecture
The purpose is to establish an ML architecture supporting training and deployment, consistent
with the ML requirements, and to evaluate the ML architecture against defined criteria.
3.16.1 General information
The goal of this process is to establish an ML architecture. The ML architecture must be designed
in response to the problem that the ML model is intended to address. ML models are very good
at identifying patterns, but some are better suited for specific problems than others. As an
example, often convolutional neural networks are used for object detection.

---

<!-- Page 132 -->

The ML architecture must contain all necessary ML architectural elements like hyperparameter
ranges and initial values, details of the ML model, and possible other software parts which are
necessary for MLE.3 "Machine Learning Training".
For the ML architecture the resource consumption objectives are required to be derived from ML
requirements for all resourcecritical elements and may differ between the trained ML model and
the deployed ML model.
The training is often done in a specific training environment defined in the ML training and
validation approach (see MLE.3). Also, for this environment resource consumption objectives
should be defined to ensure feasibility of the ML architecture.
3.16.2 Rating rules within the process
The ML architecture has to consider not only the ML model itself but also any potential additional
software which is required to train, deploy, and test the ML model.
Typical examples of necessary ML architectural elements are pre and postprocessing
components, e.g., data augmentation and ground truth evaluation. It should also be considered
that some of these ML architectural elements are required for training but will not be available
once the ML model is deployed. Such (classical) software components should be developed
according to SWE.3 "Software Detailed Design and Unit Construction" and SWE.4 "Software Unit
Verification". Evaluation of these ML architectural elements (e.g., preand postprocessing) should
be documented.
Often different ML models are considered and trained. Hyperparameters like learning rate, loss
function, model depth, regularization constants will allow the configuration of the ML model. The
rationale for different hyperparameters and initial values should be provided, and the decisions
taken should be documented.
The ML architecture also has to consider the interfaces between the different ML architectural
elements. Typically, interfaces are documented in terms of name, type, range, default value, unit,
resolution, and direction.
Rating rules:
[MLE.2.RL.1] If the ML architecture does not consider elements necessary to train, deploy, and
test the ML model then MLE.2.BP1 shall not be rated higher than P.
ག

---

<!-- Page 133 -->

3.17 MLE.3 Machine Learning Training
The purpose is to optimize the ML model to meet the defined ML requirements.
3.17.1 General information
Machine Learning uses an ML model capable of performing a functional mapping of an input to
an output tensor of data. The quality of the mapping is optimized by adjusting internal parameters
of the ML model until the deviation of output tensors from expected values is better than a
predefined threshold. Usually, these parameters are the weights of a weighted sum or average
as input to the activation function of a neuron and the hyperparameters as defined by the ML
architecture (see MLE.2).
Even simple tasks lead quickly to a highdimensional optimization problem because the number
of weights depends on the sizes of input and output tensors, the number of layers, and other
aspects. Therefore, the training process of a ML model consumes high amounts of memory and
computing power and even more if floating point operations are needed.
ML validation as part of the training process supports the optimization of the hyperparameters
during MLE.3 Machine Learning Training. The term "validation" has a different meaning than
VAL.1.
Due to the complexity of the task, the training process is usually an iterative process which can
require changes of the ML architecture see MLE.2, the ML training and validation approach, or
the ML training and validation data set. ML training might present certain challenges, including
overfitting, underfitting, or biases in the data, which could impact the performance of the model.
Even with experience, it cannot be ensured from the beginning that a defined ML architecture
achieves the required quality immediately with the first training. Therefore, iterative changes are
not an indication of failure with MLE.2 or MLE.3 but an inherent part of the process to establish
an ML model which eventually satisfies all ML requirements.
The data set for ML training and validation has to be created from the ML data collection provided
by SUP.11 according to the ML training and validation approach. Deviating leads to training results
which are not ensured to meet the ML requirements.

---

<!-- Page 134 -->

3.17.2 Rating rules within the process
Machine learning training requires already for achievement of PA 1.1 a careful preparation of the
training environment. Especially the required HW resources, and optimization approaches need
to be defined in order to achieve the targeted optimum in a reasonable time while preventing
problems like overfitting.
The data set for ML training and validation of the achieved capability of the ML model in the
training cycle must be carefully selected based on predefined criteria to support the training goal
and prevent common problems (e.g., bias). Be aware, that a separate data set for ML training
and validation is not necessarily required at training start for some ML validation approaches (e.g.,
kfold cross validation). If validation is required for the training process dedicated validation data
must be available.
The expectations for the ML training and validation approach cover these aspects:
• approaches for hyperparameter tuning/optimization to be used in the training
• approach for data set creation and modification for the ML training and validation
• training environment, including:
- required training hardware (e.g., GPU, or supercomputer to be used)
- interface adapter for provision of input data and storage of output data
• entry and exit criteria of the training including comparison of achieved capability of the ML
model with the ML requirements
• if required, actions to organize the data set and training environment.
Rating rules:
[MLE.3.RL.1] If the ML training and validation approach does not cover any of the first three
aspects then MLE.3.BP1 shall not be rated higher than P.
[MLE.3.RL.2] If the ML training and validation approach uses validation techniques which do not
require separated ML training and validation data sets at ML training start then MLE.3.BP1 shall
not be downrated.

---

<!-- Page 135 -->

3.18 MLE.4 Machine Learning Model Testing
The purpose is to ensure compliance of the trained ML model and the deployed ML model with
the ML requirements.
3.18.1 General information
The Machine Learning Model Testing process focuses on testing the agreed trained ML model to
ensure compliance with the ML requirements. Therefore, an ML test approach is specified, and
an ML test dataset is created from the ML data collection provided by SUP.11 based on ML data
requirements. After successfully testing the trained ML model, a deployed ML model is derived
and tested as well.
The deployed ML model will be integrated into the target system and may differ from the trained
ML model which often requires powerful hardware and uses interpretative languages.
Testing an ML model is done by comparing results of test data computed using the trained or
deployed ML model with expected results and nonfunctional ML requirements (e.g., KPIs) with
defined pass/fail criteria defined in the ML test approach.
ML test results supplying a meaningful summary of the computed results for the used test data
are required evidence for test execution.
The test data set has to be created from the ML data collection provided by SUP.11 according to
the ML test approach.
The ML test data set shall be used for final testing of the trained ML model and the deployed ML
model and must not be used for training. This means that no major changes/ optimization are
performed based on the ML test data set. Because with every optimization some information
over the data set leaks into the model quickly resulting in overfitting to the used data set.
If the test fails and optimization of the ML model is needed it must be ensured that the ML test
data set is still reliable to ensure compliance with the ML requirements, therefore a change of
the ML test data set may be needed.

---

<!-- Page 136 -->

3.18.2 Rating rules within the process
3.18.2.1 ML test approach
In general, all ML testing activities should be in line with the ML test approach.
The ML test approach should cover these aspects:
• ML test scenarios with distribution of data characteristics defined by ML data requirements
• frequency of each ML test scenario inside the ML test data set
• expected test result per test datum
• the required ML testing infrastructure and environment configuration for training and
deployment (e.g., embedded system)
• pass/fail criteria for the ML testing
• entry and exit criteria for the ML testing.
Rating rules:
[MLE.4.RL.1] If the ML test approach does not cover any of the first four aspects then MLE.4.BP1
shall not be rated higher than P.
[MLE.4.RL.2] If the ML test data set is used to perform major changes/optimization of the ML
model then MLE.4.BP1 shall not be rated higher than P.

---

<!-- Page 137 -->

3.19 HWE.1 Hardware Requirements Analysis
The purpose is to establish a structured and analyzed set of hardware requirements consistent
with the system requirements and the system architectural design.
3.19.1 General information
3.19.1.1 Scope of the HWE processes
See section 2.3.1.
3.19.1.2 Iterative vs. incremental development
Normally the functional content of the product changes iteratively and evolves incrementally
across releases. The term "increment" can be understood as adding a feature or element that did
not exist before (analogy: building a house). The term "iteration" can be understood as refining,
or adapting, an existing feature or element (analogy: a sculptor working on a sculpture).
Therefore, the complete set of requirements of the final end product does not necessarily have
to be available at the project start. Rather, release scopes agreed with the customer will define
increments and iterative rework. In this respect, requirements creation can be driven by release
definitions over time.
3.19.2 Rating rules within the process
3.19.2.1 Hardware development without system requirements
In case of hardware development only, the hardware requirements may refer directly to the
stakeholder requirements. Consequently, consistency and bidirectional traceability have to be
ensured between stakeholder requirements and hardware requirements.
Rating rules:
[HWE.1.RL.1] In the case of hardware development only, if the traceability and consistency from
hardware requirements to stakeholder requirements is established then HWE.1.BP5 shall not be
downrated.

---

<!-- Page 138 -->

[HWE.1.RL.2] If hardware requirements are not derived from system requirements but from
platform requirements, then HWE.1.BP1 shall not be downrated.
3.19.2.2 Structuring of requirements
Hardware requirements can be grouped or categorized to support an overview and prioritization.
See also section 2.3.3.2 here.
Rating rules:
[HWE.1.RL.3] If "functional" and "nonfunctional" are the only requirements categorization or
classification criterion, then HWE.1.BP2 shall be rated as N.
3.19.2.3 Requirements mapping to releases
A possible approach to prioritizing requirements is the allocation of requirements to releases. The
usage of such an approach will imply that the content of the next and future releases is defined.
Rating rules:
[HWE.1.RL.4] If there is no evidence for prioritization other than a release planning mapping the
functionality to future releases, then HWE.1.BP2 shall not be downrated.
[HWE.1.RL.5] If there is no evidence for prioritization but a separate release plan consistently
mapping hardware functionality to future releases then HWE.1.BP2 shall not be downrated.
[HWE.1.RL.6] If the hardware requirements that are mapped to a particular release do not match
with the system requirements mapped to the same release then HWE.1.BP2 shall be downrated.
[HWE.1.RL.7] If requirements are prioritized by means of a separate project release plan assigned
hardware requirements to releases, HWE.1.BP2 shall not be downrated.

---

<!-- Page 139 -->

3.19.2.4 Analysis of requirements
The indicator HWE.1.BP3 requires "Analyze hardware requirements. ...and to support project
management regarding project estimates". This means for example:
• A set of 100 requirements exists. An analysis was done together with the project manager
during a project progress meeting. As a result, 20 out of the 100 requirements were decided
not to be used, therefore being attributed as "rejected" with an accompanying comment
providing expectations.
• A set of 10 requirements were planned for the next release. The development team reports
to the project manager that this is no longer feasible due to resource constraints. The decision
is not to change the status of those 10 requirements but to reallocate them to future releases.
This can be evidenced by a comparison of the release plans (which is the process context of
MAN.3 but not HWE.1).
Analysis of requirements can be done by means of using e.g., tool-based attributes, or
comments added to the requirements text.
The analysis of hardware requirements is the basis for a correct implementation. Even though
requirements sometimes appear very simple, a wellfounded analysis has to be conducted for
those requirements. The scope and appropriateness of the analysis depends on the context of
the product (e.g., platform). The results of analysis can vary from a simple attribute to a complex
simulation or the building of a demonstrator to evaluate the feasibility of hardware requirements.
The reason for having associated this BP with the supporting of project management regarding
project estimates is the following: revising hardware requirements by means of an analysis may
(re)define the scope of work. Once this solution is settled, HWE.4 will select verification
measures for addressing exactly that problem space. This is to say, HWE.4 itself does not change
that problem space, therefore does not alter the overall project's scope of work.

---

<!-- Page 140 -->

Rating rules:
[HWE.1.RL.8] If analysis results of requirements are not demonstrated by means of separate
analysis reports or review records but by means of e.g., tool-supported attributes or tool-
supported commenting, then HWE.1.BP3 shall not be downrated
[HWE.1.RL.9] If the analysis of requirements is not evidenced by separate review records then
HWE.1.BP3 shall not be downrated.
[HWE.1.RL.10] If the analysis of hardware requirements in regards to technical feasibility is
covered by risk management then then HWE.1.BP3 shall not be downrated.
[HWE.1.RL.11] If analysis results of hardware requirements regarding impact on estimates are
not consistently used by project management, then HWE.1.BP3 shall not be downrated.
3.19.2.5 Traceability and consistency
HWE.1.BP5 offers the possibility of having two paths for traceability:
a) between hardware requirements and system architectural design (SYS.3)
b) between hardware requirements and system requirements (SYS.2).
However, redundancy, i.e., using the two traceability paths for the very same hardware
requirement at the same time, is neither intended by this BP nor meaningful. Further, it is not
intended to express that all, or the majority of the, hardware requirements should be traced to
system requirements directly as a default. Which path appears more appropriate must depend
on the actual content of the hardware requirement itself.
See also section 3.3.1 of SYS.1 and section 2.3.4 here.
3.19.3 Rating rules with other processes at level 1
None.

---

<!-- Page 141 -->

3.20 HWE.2 Hardware Design
The purpose is to provide an analyzed design, that is suitable for manufacturing, and to derive
productionrelevant data.
3.20.1 General information
3.20.1.1 Scope of the HWE processes
See section 2.3.1.
3.20.1.2 Why no extra processes for HW architectural design and
HW detailed design?
In hardware engineering practice
·
• HW architectural design begins at the block diagram level, being the starting point for the
detailed design. Detailed hardware design is the level of information from which physical HW
instances can be created, i.e., initial block diagrams do not reveal that level of detail.
• the entire HW design process is performed iteratively. Technical details that originate from
lower design levels such as schematics or layout (detailed design) might be added to block
diagram models (architectural design) in order to provide further information for distinct
verification and testing that are aimed to be done at the architectural level.
Further, note that the following assumptions would not serve as a motivation for separating HW
architectural and detailed design at the level of a PRM:
1. "In their development processes companies may have extra activities for architectural and
detailed design, mostly done iteratively with HW detailed design."
• A PRM/PAM does not represent a lifecycle model, see Automotive SPICE 4.0 section 3.3.4.
• A PRM/PAM is at the processWHAT-level, while processes in companies are at the
processHOW-level. Therefore, it is the assessor's responsibility to map Assessment
Indicators in a PAM to the assessed context. See Automotive SPICE 4.0 section 3.3.3.

---

<!-- Page 142 -->

2. "Two processes would provide a better overview, i.e., a more orderly partitioning of topics".
• A PRM/PAM, by definition, does not represent a lifecycle model. Therefore, it is the
assessor's responsibility to map assessment indicators in a PAM to information presented by
projects and organizational units, see Automotive SPICE 4.0 section 3.3.
Also note that this HWE PRM/PAM does not represent an ECU level (see section 2.3.2).
For these reasons, at the level of a PRM, there is no necessity to separate HW architectural
design and HW detailed design into two processes. The BPs needed to assess architectural and
detailed design remain within HWE.2.
This is also consistent with the following models:
• ISO 26262-5:2018
• Swedish Standard SS 7740:20183
• PISA
• AIDA5
3.20.1.3 Analysis of the hardware design (BP4) vs. HWE.3
A note in HWE.2.BP4 explains that techniques for analyzing the hardware design can be e.g.,
simulations, calculations, or analytical approaches. These techniques are also admissible for
verification measures in the context of HWE.3. This might raise the questions whether
HWE.2.BP4 and HWE.3 are somewhat redundant, and if the process purposes HWE.2 and
HWE.3 are overlapping. However, this is not the case:
3 The choice of the Swedish Standard SS 7740:2018 (being a PRM/PAM aiming for integrating elements from Automotive SPICE® PRM v 4.5
and PAM v2.5, and particular processrelated clauses in ISO 26262:2011 1st Ed) was to also have a single hardware design process only
(SE.ENG.5). This single process comprises BPs for both hardware architectural design and hardware detailed design.
4 In the PISA model (Process Improvement Scheme for Automotive, as proposed by the System & Software Evaluation Centre, National
Research Council of Italy), the "hardware segment" consists of four processes. Only one of them "...pertains to the definition of electronics
design, including the preparation of the physical layout", namely HW1. There is no separation into HW architectural design and hardware
detailed design at the process level; a distinction between HW architectural and detailed design is internal to HWE.1.
5 Similarly to the Swedish standard SS7740, the Italian AIDA model explains itself both as a reference for reaching compliance with ISO
26262:2018 and as a PAM for processes assessment. It defines a single PRM process "hardware design", i.e., no separation of a HW
architectural and detailed design; the process "hardware architectural metrics" only covers the ISO 26262 [ISO26262] clauses on HW
architectural metrics and evaluation of safety goal violations due to random hardware failures.

---

<!-- Page 143 -->

• HWE.3 verifies if a given physical (production data compliant hardware sample reveals the
characteristics defined by the hardware design. This means, the "object-undeㄱverification"
is the physical hardware sample.
• In contrast HWE.2.BP4 determines whether the hardware design itself, i.e., documented
information such as schematic and layout etc., is appropriate. This means, the "object-unde
ㄱanalysis" is not a physical hardware sample but documentation representing the design
decisions.
The reason for having associated this BP with the supporting of project management regarding
project estimates is the following: revising hardware design solutions because of a design
analysis may (re)define the scope of work. Once this solution is settled, HWE.3 will select
verification measures for addressing exactly that solution space. This is to say, HWE.3 itself does
not change that solution space, therefore does not alter the overall project's scope of work.
3.20.1.4 ISO 26262 "Evaluation of HW Elements" is not an
alternative for HWE.3 and HWE.4
The processes HWE.3 and HWE.4
• do not take a single HW element perspective. This is because the term 'hardware element'
can denote a HW part, a HW component, or the complete hardware (see glossary).
• are not restricted to safety-related products or contexts, so for hardware development the
HWE processes represent what ISO 26262 calls 'evidence of compliance with standards that
support quality management' (ISO 26262-8:2018 [/SO26262], clause 5.3.2 example 2).
Clause 13 in ISO 26262-8:2018 [ISO26262] addresses how to proceed with a procured individual
HW element that is supposed to be used in a safety-related product. Therefore, hardware part
evaluation according to ISO 26262-8:2018 [ISO26262], clause 13 is complementary to HWE.3
and HWE.4 and does not contradict them.
3.20.1.5 Communicate agreed hardware architecture and
hardware detailed design
Apart from verification personnel, further important stakeholders can be manufacturing.
Integrating this party in the information flow supports ensuring that Special Characteristics and
relevant production data are properly verified and controlled in production.

---

<!-- Page 144 -->

143 3.20.2 Rating rules within the process
3.20.2.1 Traceability and consistency
See also section 3.3.1 of SYS.1 and section 2.3.4 here.
3.20.3 Rating rules with other processes at level 1
None.
3.21 HWE.3 Verification against Hardware Design
The purpose is to ensure that the production data compliant hardware is verified to provide
evidence for its compliance with the hardware design.
3.21.1 General information
3.21.1.1 Scope of the HWE processes
See section 2.3.1.
3.21.1.2 General explanation
Integration in terms of software or mechanical lifecycle processes is understood as a stepwise
assembly of a product, and performing tests along, or in between, the assembly steps. This
notion is not always applicable per se to hardware development. Rather, a HW often is fully
assembled first, and then HW testing is performed on the fully assembled hardware by e.g.,
using measuring points inside the HW to test the inputs and outputs with variations.
Further, testing of a single HW element always includes the testing of the interfaces as such
tests need electrical input signals and output load. This implies that 'testing a single HW element
in isolation' inherently includes 'testing the interfaces between HW elements', as they are not
conceptually distinct elements.
The notion of 'reusing HW components' might be understood as integrating a physical, and
already verified, HW component. However, reusing a HW component is not a "physical activity"
in the sense that a HW component is "taken off the shelf and sol-

---

<!-- Page 145 -->

dered onto a PCB". Rather, this refers to reusing parts of HW design drawings, or models, during
the creation of the HW design.
Examples:
• A voltage measurement solution is taken from an earlier schematic design, or from a model
database, and placed into another schematic.
• A model library contains components for reuse in the chip design.
This will also require verification of the "reused" HW component as the influences of the rest of
the (new) surrounding hardware must be considered.
Thus, in order to avoid confusion and speculation the term 'integration' is not used in the context
of HWE.3.
The processes HWE.3 and HWE.4 can be mapped to ISO 26262-5:2018 [ISO26262], clause 10.
3.21.1.3 Rationale for BP "Ensure use of compliant samples"
What would be the consequences if HWE.3 did not have this base practice?
• Upon not-OK verification results one would not know whether this is due to design flaws or
production (or sample construction workshop's, as applicable) errors. The latter is not in the
scope of the HWE PRM/PAM (see section 2.1.1). SPICE models remain PRMS/PAMs for
development.
• It would be economically disadvantageous to spend effort on HWE.3 just find out later that
this was wasted because the verification was performed on an incorrect sample in the first
place.
(Note that this is not an argument at the abstraction level of a PrM/PrM, however still a
reasonable one.)
In reality
• sample construction workshops (German: "Musterbau") sometimes deliver samples that are
not compliant (e.g., the exact soldering paste might not have been available, or because of
the manual activities).
• electronics production generally has varying manufacturing quality, or even deviations, even in
presence of state of the art production quality plans, production traceability etc.

---

<!-- Page 146 -->

For these reasons, it is necessary to include an "interfacing base practice" within HWE.3 to ensure
that the delivered sample matches the specifications of the ordered sample (means: hardware
production data compliant). In order to satisfy HWE.3.BP3, one out of many possibilities certainly
is e.g., EOL testing. However, as mentioned above, such processes or aspects are not in the
scope of HWE PRM/PAM.
Comparison with configuration management:
This BP could be viewed as some sort of "HW baseline integrity check", and therefore be replaced
by an editorial pointer to the Automotive SPICE® process SUP.8. However, SUP.8 encompasses
more than just a single baseline audit base practice. Further, the definition of a "HW baseline"
(which is another base practice in SUP.8), actually happens in the context of HWE.2. For better
usability and intuitiveness of the HWE PRM/ PAM, the respective BPs in HWE.3 and HWE.4 are
introduced, and kept, instead of pointers to SUP.8.
3.21.1.4 The meaning of step-wise hardware integration testing
There is no conceptual distinction between 'testing a single HW element' and 'testing interfaces
between HW elements' as explained above. Therefore, examples on how to understand the
suggestion of "step-wise verification" as stated in HWE.3.BP1 Note 2 are
• additional measuring points used only for the purpose of checking internal signals (e.g., for
boundary scan tests, contacts for needle bed adapter in production test)
• power supply module testing:
connecting a power supply (with current limiting) to the PCB
measuring the voltage at the power supply test points on the PCB to ensure that the correct
voltage levels are being supplied
checking for any abnormal heating of components on the power supply circuit.
3.21.1.5 Verification measures do not require using identical
hardware samples
The need for physical hardware samples depends on the actual content of the verification
measure. There are verification measures that do not require, or even cannot be performed on,
physical hardware samples, i.e., calculations, simulations, reviews, and analyses; still, simulation
models can be improved based on measurements with real physical samples.

---

<!-- Page 147 -->

This is why HWE.3.BP2 "Ensure use of compliant samples" is distinct from HWE.3.BP4 "Verify
hardware design". As per BP text, the latter does not demand using physical samples.
Correspondingly, the former only implies that if physical samples will be needed, then they shall
be production data compliant.
3.21.1.6 Specify verification measures
HWE.3.BP1 requires the identification of the necessary verification infrastructure and
environment setup. This may be supported using simulation of the environment. This
environment can be hardwareintheloop simulation, vehicle network simulations, or digital
mockups.
Verification results can support the updating of simulation models.
3.21.1.7 Verification logs as evidence for verification results
A large amount of logged data may be generated, which will be available via e.g., verification logs.
Also, if verification is performed manually the results may be provided in different levels of detail.
Verification results need to be meaningfully abstracted or derived from such log data. Still, for
BP6 "Summarize and communicate", the verification results will need to be further summarized.
3.21.2 Rating rules within the process
3.21.2.1 Verification measure definition
Rating rules:
[HWE.3.RL.1] If entry/exit criteria are reasonably specified for a set of verification measures
instead of each individual verification measure, then HWE.3.BP1 shall not be downrated.

---

<!-- Page 148 -->

3.21.2.2 Automation of verification measures
Rating rules:
[HWE.3.RL.2] If a verification measure is automated and the correctness, completeness, and
consistency of the corresponding scripts and programs are not addressed in the verification
measure definition then HWE.3.BP1 shall be downrated.
3.21.2.3 Verification vs. traceability/consistency
The state of the art testing not only comprises testing derived from requirements but also
explorative testing based on experience, such as "error guessing based on knowledge". This is
valuable as it adds to the quality of the product. Therefore, explorative tests that are based on
experience cannot, by definition, be traced or consistent with the hardware requirements.
Still, traceability is needed between explorative test cases and their results.
Rating rules:
[HWE.3.RL.3] If verification measures representing explorative tests, which, by definition, cannot
be traced to the hardware, have no such traceability then HWE.3.BP4 shall not be downrated.
3.21.2.4 Traceability and consistency
See also section 3.3.1 of SYS.1 and section 2.3.4 here.
3.21.3 Rating rules with other processes at level 1
3.21.3.1 Verification measures selection vs. release plans
Rating rules:
[HWE.3.RL.4] If selection of verification measures is properly done but based on an inadequate
or incomplete release plan, then HWE.3.BP3 shall not be downrated.

---

<!-- Page 149 -->

3.22 HWE.4 Verification against Hardware Requirements
The purpose is to ensure that the complete hardware is verified to provide evidence for
compliance with the hardware requirements.
3.22.1 General information
3.22.1.1 Scope of the HWE processes
See section 2.3.1.
3.22.1.2 BP "Ensure use of compliant samples"
Why is this base practice also needed in HWE.4? Will the samples used for HWE.3 not be the
same as the ones used in HWE.4? This might be, but is not generally, the case. From a HW
development lifecycle perspective, reasons are e.g.
• In early development phases breadboards are used which are typically not used anymore in
the context of HWE.4.
• The samples for HWE.3 and HWE.4 do not always have the same assembly
placement/mounting options (German: "Best ckung") due to different verification goals,
verification environments, and HW delivery purposes in HWE.3 and HWE.4.
ü
3.22.1.3 Why HWE.4 does not require samples whose compliance
to the HW design have been verified
It is not necessary to use the very same physical samples for both HWE.3 and HWE.4. Reason:
The BP "Ensure use of production data-compliant samples" exists in both HWE.3 and HWE.4. It
ensures detecting varying manufacturing quality, or even manufacturing deviations to make sure
that these are tolerable enough for samples to be used for verification. As long as this is the case
for any sample, in fact different samples may be used in HWE.3 and HWE.4, respectively. In
other words: the very same sample does not necessarily need to undergo both HWE.3 and
HWE.4; if HWE.3 verifies a production data-compliant sample X is compliant with the hardware
design, then it can be concluded that another production data-compliant sample Y, which
successfully undeㄱwent HWE.4, automatically is designcompliant, too (and vice versa).

---

<!-- Page 150 -->

Also remember that a PAM is not a lifecycle model and therefore cannot predefine any order of
processes or sample processing (see Automotive SPICE PRM and PAM section 3.3.4). However,
both design compliance and hardware requirements compliance must still be proven by means
of physical samples.
3.22.1.4 Verification measures do not require using identical
hardware samples
The need for physical hardware samples depends on the actual content of the verification
measure. There are verification measures that do not require, or even cannot be performed on,
physical hardware samples, i.e., calculations, simulations, reviews, and analyses; still, simulation
models can be improved based on measurements with real physical samples.
This is why HWE.4.BP2 "Ensure use of compliant samples" is distinct from HWE.3.BP4 "Verify
hardware design". As per BP text, the latter does not demand using physical samples.
Correspondingly, the former only implies that if physical samples will be needed, then they shall
be production data compliant.
3.22.1.5 Specify verification measures
HWE.4.BP1 requires the identification of the necessary verification infrastructure and
environment setup. This may be supported using simulation of the environment. This
environment can be hardwareintheLoop simulation, vehicle network simulations, or digital
mockups.
Verification results can support the update of simulation models.
3.22.1.6 Verification logs as evidence for verification results
A large amount of logged data may be generated, which will be available via e.g., verification logs.
Also, if verification is performed manually the results may be provided in different levels of detail.
Verification results need to be meaningfully abstracted, or derived from, such log data. Still, for
the purpose of BP6 "Summarize and communicate", the verification results need to be further
summarized.
3.22.1.7 Analysis of the hardware design (BP4) vs. HWE.3

---

<!-- Page 151 -->

See section 3.20.1.3.
3.22.2 Rating rules within the process
3.22.2.1 Verification measure definition
Rating rules:
[HWE.4.RL.1] If entry/exit criteria are reasonably specified for a set of verification measures
instead of each individual verification measure, then HWE.4.BP1 shall not be downrated.
3.22.2.2 Automation of verification measures
Rating rules:
[HWE.4.RL.2] If a verification measure is automated and the correctness, completeness, and
consistency of the corresponding scripts and programs are not addressed in the verification
measure definition, then HWE.4.BP1 shall be downrated.
3.22.2.3 Explorative verification vs. traceability/consistency
The state of the art testing not only comprises testing derived from requirements but also
explorative testing based on experience, such as "error guessing based on knowl-edge". This is
valuable as it adds to the quality of the product. Therefore, explorative tests that are based on
experience cannot, by definition, be traced or consistent with the hardware requirements.
Still, traceability is needed between explorative test cases and their results.
Rating rules:
[HWE.4.RL.3] If verification measures representing explorative tests, which, by definition, cannot
be traced to the detailed design, have no such traceability then
HWE.4.BP5 shall not be downrated.
3.22.2.4 Traceability and consistency

---

<!-- Page 152 -->

See also section 3.3.1 of SYS.1 and section 2.3.4 here.
3.22.3 Rating rules with other processes at level 1
3.22.3.1 Verification measures selection vs. release plans
Rating rules:
[HWE.4.RL.4] If selection of verification measures is properly done but based on an inadequate
or incomplete release plan, then HWE.4.BP3 shall not be downrated.
3.23 SUP.1 Quality Assurance
The purpose is to provide independent and objective assurance that work products and processes
comply with defined criteria and that nonconformances are resolved and further prevented.
3.23.1 General information
As stated in the purpose, the quality assurance process covers all independent quality assurance
activities for relevant work products (i.e., not just software source code) and processes based on
defined criteria.
Note that agile methods and practices are not in conflict with Automotive SPICE. These may also
incorporate suitable quality assurance measures, e.g., "early and objective evaluation", DOD
(definition of done), pair work or multiauthoring approaches, integrated learning cycles etc.
Quality assurance must also be extended to the quality of supplier deliveries according to the
project scope and context. Supplieㄱrelated quality assurance activities must be clearly identified
and may also include assessments.
3.23.2 Rating rules within the process

---

<!-- Page 153 -->

3.23.2.1 Ensure independence of quality assurance
Independence of quality assurance means that it must be unbiased and free of conflict of interest.
This relates also to the fouㄱeyes principle, e.g., selfmonitoring of the author of a work product
is not sufficient. Additionally, independent quality assurance (e.g., a quality engineer role) within
the project must not be taken by the project manager or a devel-oper of the same project;
however, they may take such responsibilities in a different project.
In teams where independence in terms of organizational structure cannot be effectively ensured
(e.g., small organizations), as a minimum independent reporting and escala-tion paths must be
established to the appropriate levels of management. This is also valid if quality assurance
activities are performed by externally contracted persons.
Another perspective related to independence beyond organizational structure is the financial or
resources perspective. Authority for financial decisions may negatively influence seemingly
adequate operational or organizational independence.
3.23.2.2 Define criteria for quality assurance
Criteria for quality assurance including the appropriateness of work products and pro-cess
performance shall be identified based on the project context. The criteria may consider internal
rules and expectations, but also external inputs such as customer requirements and standards.
From the identified criteria, methods for ensuring the quality of all relevant work prod-ucts and
processes are to be decided on.
3.23.2.3 Assure quality of work products
To assure the quality of work products, typically work product reviews (e.g., peer review,
walkthrough, inspection) as verification methods are performed. These reviews are based on
predefined review methods and criteria. The review participants must further possess sufficient
expertise to review the work products (e.g., testers may review the requirements to ensure
testability). The review participants need to be documented.
In practice, quality engineers may also participate in selected work product reviews of the system
and software engineering processes. This may raise the effectiveness of performing the reviews
and controlling the quality of work products. However, nonpaㄱticipation of quality engineers in
such reviews does not necessarily lead to a weakness in BP3 if there are other ways established
to assure and control these work products by the independent quality assurance.
By evaluating SUP.1 BP3, evidence shown during the system and software engineering process

---

<!-- Page 154 -->

interviews may be also considered. It means, weaknesses identified related to ensuring the
consistency of the system or software engineering related work products may be considered
during evaluation of this base practice.
Rating rules:
[SUP.1.RL.1] If activities for work product quality assurance do not make use of any type of
review-oriented method, then BP3 shall be downrated.
[SUP.1.RL.2] If quality assurance of work products checks for pure existence of work products
only without considering any criteria for content correctness and structure, then BP3 shall not be
rated higher than P.
[SUP.1.RL.3] If quality assurance of work products (BP3) is rated N or P, then PA 1.1 shall not be
rated higher than L.
3.23.2.4 Assure quality of process activities
Quality assurance of process activities aims to discover nonconformances in process
performance. This may include process assessments, audits, checks of correct application of
methods and tools, and the adherence to defined processes, reports and lessons learned that
will improve processes for future process performance.
Rating rules:
[SUP.1.RL.4] If quality assurance of process activities is based on performing process
assessments (either by a customer or internally) only, the indicator BP4 shall be downrated.
[SUP.1.RL.5] If quality assurance of process activities (BP4) is rated N or P, then PA 1.1 shall not
be rated higher than L.
3.23.2.5 Ensure resolution of nonconformances
Nonconformances identified in any kind of quality activities, such as reviews have to be resolved.
Often there is a lack of understanding that the initiator of the nonconformance alone cannot
determine what exactly has to be improved. Therefore, joint coordination between initiator and
resolver may be necessary in a timely manner.
Nonconformances have a priority and a due date for resolution. The resolutions must be agreed
on.
Prevention of nonconformances ensures they will not occur systematically again. Various
measures of technical, mathematical, or organizational nature can support process quality

---

<!-- Page 155 -->

assurance for this purpose. Supporting techniques may be continuous monitoㄱing, cross
functional collaboration, root cause analysis with 5-why, lessons learned, etc.
Rating rules:
[SUP.1.RL.6] If nonconformances related to work products are neither identified nor documented,
then BP3 shall be downrated.
[SUP.1.RL.7] If nonconformances related to process activities are neither identified nor
documented, then BP4 shall be downrated.
3.23.2.6 Escalate nonconformances
Nonconformances that cannot be resolved by project staff or those that are delayed too much
shall be escalated to an appropriate level of management. This is to cover all relevant stakeholders
(e.g., technical and quality management, customer, suppliers). Escalations are resolved by
means of corrective actions ensured by these stakeholders. Note, that not each and every
nonconformance will be subject to escalation.
Established criteria of urgency and impact can help identifying the appropriate level of
management. A defined status model for escalations can help tracking the escalations to
completion.
The resolution of escalated nonconformances may be an indication for the effectiveness of
escalation measures.
Rating rules:
[SUP.1.RL.8] If escalations are not followed up on by effective corrective actions, then BP7 shall
not be rated higher than P.

---

<!-- Page 156 -->

3.24 SUP.8 Configuration Management
The purpose is to establish and maintain the integrity of relevant configuration items and
baselines and make them available to affected parties.
3.24.1 General information
Configuration management covers the identification of configuration items, i.e., relevant inputs
and work products, of relevant stakeholders of processes and the control of modifications.
Furthermore, it covers the management of baselines for different disciplines, sites, processes,
etc.
Configuration management for different domains (such as hardware engineering, system or
software development) may differ. Different approaches and "de facto" standard tools may be
appropriate. Nevertheless, there should be an overall consistent baseline set available.
Configuration management importance and complexity rises with the size of the organization,
number of interfaces, and the number of work products that need to be maintained. The chosen
configuration management approach must be suited to handle the given complexity adequately.
3.24.2 Rating rules within the process
3.24.2.1 Identification of configuration items
As a starting point, all work products needed to produce the final product should be considered
as configuration management items. Example: while requirements, design, test cases and

---

<!-- Page 157 -->

results etc. may be identified configuration items, a meeting agenda or minutes may not be. This
may also include input work products from external sources, e.g., externally procured software
libraries. Further, it is not an obligation to include development tools themselves as configuration
items (though at least their version used should be documented) unless they may become a part
of the product to be controlled.
The further identification of configuration items needs to consider the organization, domains and
respective stakeholders. As there can be a number of reasons to include or exclude configuration
items, criteria shall be defined. Such criteria can be derived for example from formal requirements
(e.g., in safety or security), policies, application pa-rameters, categories such as documents,
requirements, source code, deliveries etc. As configuration items identification can support
Quality assurance (SUP.1) and vice veㄱsa, also quality driven criteria may be given or derived for
it.
For configuration management it is crucial to establish control of changes to the relevant product
it is intended to support. Therefore, the selection criteria should be verifia-ble on the outcome
of the configuration item identification.
Rating rules:
[SUP.8.RL.1] If the configuration items identification fails to include stakeholder needs related to
the product(s) to be controlled, the indicator BP1 shall not be rated higher than P.
[SUP.8.RL.2] If the identification of configuration items does not sufficiently cover the relevant
work products (BP1), and this results in relevant work products not being controlled, baselined
and reported, the indicators BP4, BP5 and BP6, respectively, shall be downrated.
3.24.2.2 Configuration management mechanisms
In order to support organizations for the availability of configuration items, the configu ration
management enables and supports the parallel working on configuration items. For each product
domain, different configuration management practices and tools may be required to fit those
needs.
Configuration management mechanisms need to be adequate for the number and composition
of configuration items to be managed. A rather small number of configuration items can be
managed in a simplified form.
Configuration items may have very different characteristics regarding the effort required for their
creation, change and maintenance. E.g., changes to hardware configuration items (e.g.,
schematics and layout for printed circuit boards,) typically require higher effort and time while
software related configuration items such as configuration files can be changed more quickly.

---

<!-- Page 158 -->

Performing the SUP.8 process should establish a "configuration management system". However,
that does not necessarily mean one single tool or repository for all configura-tion items.
Configuration items may be stored in different repositories (e.g., hardware schematic drawings
within their dedicated design tool, software code in a versioning environment, software design
models as a CASE tool database element), thus indicat-ing a need for e.g., an individual version
control tool.
However, the resulting complexity of a rising number of configuration items stored in multiple
locations may not be adequate in every context. Distributed storage and handling still must follow
the idea of an integrated "configuration management system" that supports its mechanisms,
such as control, baselining, and reporting, across all subsystems.
The software domain benefits from the usual lower effort and time needed to make changes to
their configuration items, but should benefit from parallel work as much as possible without
conflicts. As this may result in a high complexity to be managed, diffeㄱent and additional
practices may be necessary depending e.g., on the size of the devel-opment team and the
resulting amount of actual parallel work performed. For example, branching and merging is a
practice to create different versions (branches) of a set of configuration items. This allows for
making changes, and then optionally merging these changes back or even forward to other
configuration items. Branches can satisfy diffeㄱent purposes such as single release creation and
maintenance, stabilization and troubleshooting of versions, or preparation of versions that can be
supported for long time bug fixing only (frozen branch). Branching and merging guarantees valid
statuses of configuration items and organizes parallel changes.
Specifically for software source code, branching and merging often refers to a codebase. Here,
branching and merging further supports software quality-related objectives (e.g., dependent on
the level of release a branch is leading to, software metrics specific for various branches, different
definitions of code test and review coverage).
However, branching and merging generally relates to any configuration items, not only to the
software source code level.
Rating rules:
[SUP.8.RL.3] If there is no dedicated configuration management tool in place, but the established
procedure is adequate for the complexity of the product to be developed, then BP3 shall not be
downrated.
[SUP.8.RL.4] If the established mechanisms for configuration management are not able to
support the complexity related to the product, the indicator BP3 shall be downrated.

---

<!-- Page 159 -->

3.24.2.3 Baselines
Configuration baselines are frozen (i.e., read-only) sets of configuration items at a specific point
in time. They can act as reference point for future changes and support rollbacks when necessary.
Baselines can be driven by purpose and time.
Expectations for defining and establishing baselines are
• Internal and external baselines triggers are possible. For example, internal baselines can
provide requirements and design information to testing and verification departments. An
externally triggered baseline is, for example, necessary to fulfill SPL.2.BP8 for the release
package delivered to the intended customer. Baselines may be created to cover different
subdomains, disciplines, sites, pro-cesses etc., e.g., hardware vs software, design vs test
work products. In this case, baselines should be organized hierarchically: if there is e.g., a
software
• baseline including all relevant software files and development documentation, and another
one for hardware, then a higheㄱlevel baseline needs to connect these two subdo-main
baselines (e.g., via a product bill-ofmaterial). Further, it is important to consider that these
two subdomain baselines and the higheㄱlevel baseline may use diffeㄱent configuration
management subsystems. On the highest level an overall baseline should cover all required
configuration items regardless of type, domain, etc.
• The baselines contain complete and consistent sets of configuration items required to
reproduce the progress achieved between the baselines.
3.24.2.4 Completeness and consistency
Completeness and consistency of configuration items and baselines is important to ensure the
overall quality and integrity. It requires an appropriate set of measures for ensuring their
completeness and consistency.
This can be supported by using traceability information, results of verifications, data of version
control systems and change control systems for verifying that changes are properly documented.
For example, dedicated configuration audits may verify the suitability of configuration items and
integrity of the baselines for the respective domain, organization, and prod-uct.
Rating rules:
[SUP.8.RL.5] If baselines for different disciplines or processes are not consistent, or if overall
baselines do not exist, the indicator BP7 shall be downrated.
[SUP.8.RL.6] If establishing baselines (BP5) is downrated, the indicator BP7 shall be downrated.

---

<!-- Page 160 -->

3.24.2.5 Verify backup and recovery mechanisms' availability
Backups are an aspect of ensuring the availability and integrity of configuration items and
baselines for all stakeholders. Factors that influence the availability and perfoㄱmance of backups
are e.g., frequency of changes, storage location, their retention period, and the recovery process.
Backup and recovery mechanisms are recognized as an important foundation of configuration
management. This is often performed and maintained centrally by an IT oㄱganization, and as
such often regarded as being outside of the scope of the configura-tion management personnel
of a project. If backup and recovery is based on, or represented by, internal IT policies or
strategical decisions (e.g., outsourced IT) then this may not be rated negatively.
Backup and recovery mechanisms must not be confused with archiving.
3.25 SUP.9 Problem Resolution Management
The purpose is to ensure that problems are identified, recorded, analyzed, and their resolution is
managed and controlled.
3.25.1 General information
The Problem Resolution Management Process covers the management of all issues where e.g.,
more than one stakeholder is involved, or which are not resolved immediately.
For example, a customer may be the initiator of a problem report that is addressed by the

---

<!-- Page 161 -->

development project. In some cases, there even is no direct interaction between the customer
and the development project, where the interface is managed by e.g., a customer support
organization in between. Such levels of interfaces need to be considered.
3.25.2 Rating rules within the process
3.25.2.1 Problem identification
The identification of problems include the following aspects:
• if applicable, project life cycle phase in which problem is recorded (e.g., during pro-totype
construction, series development)
• if applicable, initiating communication interfaces between project-specific disciplines,
affected domains and subprojects (e.g., software platform, Al build, hardware sample)
• supporting information required e.g., for reproducibility, frequency of problem occuㄱrence or
observed effects and patterns.
3.25.2.2 Determination of cause and impact
The expectations for an adequate cause and impact determination of problem records cover the
following aspects:
• The systematic evaluation of the root causes.
• The systematic evaluation of potential effects of the identified problems on other systems
(e.g., use of standard software components across different projects).
• The systematic consideration of common problems, and potential common causes, in the
same application (e.g., reuse of erroneous code in software clones, variants).
Rating rules:
[SUP.9.RL.1] If the identification and recording of problems (BP1) is rated P or N due to an
imprecise description, then BP2 shall be downrated.
3.25.2.3 Authorize urgent resolution action
When
• the timeframe for resolving of a resolution is not suitable or too short, or
• regular problem management and resolution is not possible short-term

---

<!-- Page 162 -->

then urgent resolution can be required. Urgent resolution requires special authoriza-tion.
Examples are releasing ad-hoc instructions, product call-backs, or implementing a workaround.
In order to prevent further damage and/or harm, urgent resolution actions may also include
unconventional approaches such as disabling certain functionalities or the entire systems.
However, such short-term and workaround actions (i.e., divergent to the defined pro-cess) still
need to be synchronized with permanent problem resolution (i.e., according to the defined
process). Urgent resolution action is to avoid, or limit, harm but not an excuse for not following
systematic problem resolution.
Rating rules:
[SUP.9.RL.2] If rules for urgent problem resolution are defined, but urgent resolution has not
been necessary so far, then BP3 shall not be downrated.
3.25.2.4 Alert notification
Preparing for an alert notification as a means for problem resolution involves communicating the
problem to relevant customers and stakeholders, independent of the originator of the problem.
This step identifies issues in connected or distributed projects, systems, and related variants.
Proactive alert notification may be needed to inform their direct customers, receiving platforms
or even authorities.
Such notifications may be triggered based on criticality, type, or root cause of the prob-lem. In
highly automated development environments also problems rated as less critical/urgent may lead
to the information of affected parties (e.g., by the use of common problem management tools).
For all alert notifications to be effective, usable and suitable descriptions with clear and concise
language are necessary, reflecting the recipient's level of understanding.
In the context of deciding on alert notifications, the precision and comprehensiveness of the
problem description should be taken into account.
3.25.2.5 Multidependencies and status tracking to closure
In the context of SUP.9, problems may be organized hierarchically, i.e., a set of prob-lems may
be identified to be subproblems of a more general problem.
Further, as SUP.9.BP5 says, a problem might be resolved by means of change requests and/or
development tasks. Especially in presence of ALM and/or PLM tools, such development tasks
and change requests can be represented by their own repository/database objects. This means,
change requests and development tasks are often directly linked to the problem.

---

<!-- Page 163 -->

Thus, the status tracking of a problem needs to be consistent with the status of all consequent
change requests and tasks etc. The closure of a problem, in particular, will require the closure of
its associated change requests and tasks.
In Figure 3-3, problem A is resolved by means of a change request, which in turn is processed
by means of development tasks 1 and 2. The status situation however is not consistent: a
problem cannot be closed if its resolution actions are not closed first. Since, a problem can, but
does not have to be, resolved via change requests, problem B in Figure 3-3 shows another
inconsistent example.
Figure 3-3 Examples of inconsistent status between problems and other associated work items
Any problem can be tracked using the status information that is assigned to it. When the status
of a problem is set to resolved, the problem solving shall be confirmed by the problem report
initiator by early and objective evaluation if applicable (e.g., in system demos or inspection
meetings) or shall be documented in a reproducible manner.

---

<!-- Page 164 -->

Rating rules:
[SUP.9.RL.3] If the status of a problem is set to resolved while associated work items (such as
change requests or development tasks etc.) are not yet completed, then SUP.9.BP6 shall be
downrated.
3.26 SUP.10 Change Request Management
The purpose is to ensure that change requests are managed, tracked and implemented.
3.26.1 General information
The Change Request Management Process covers the management of all change requests.
Change request management may be using the same workflow approach as Problem Resolution
Management (SUP.9) or an independent, fully separated one. In both cases, the decision
authority and interaction of their stakeholders is of high importance according to the
organizational and/or project-specific aspects like affected disciplines (e.g., system, software,
electronics), affected domains (e.g., platform, COTSSoftware), internal and external stakeholders
or affected sites.
Change requests might be initiated by problems, which needs to be visible by means of a
corresponding traceability and considered during tracking (see also section 3.25.2.5).

---

<!-- Page 165 -->

3.26.2 Rating rules within the process
3.26.2.1 Change request identification and recording
The identification and recording of change requests include the following aspects:
• if applicable, project life cycle phase in which change request is recorded and needed (e.g.,
during prototype construction, series development)
• if applicable, initiating communication interfaces between project-specific disciplines,
affected domains and subprojects (e.g., software platform, Al build, hardware sample)
• supporting information required, for example alternatives and variable content for a change,
references or demonstrators.
Traceability between change requests, problems, affected work products and corresponding
baselines has to be ensured over all affected disciplines and all affected domains considering the
project-specific complexity.
3.26.2.2 Analysis and assessment of change requests
• The expectations for an adequate analysis of change requests cover these aspects:
• The input from all relevant stakeholders (internal and external) is considered includ-ing
technical aspects and potential side effects, for example degraded functionality or
compatibility problems.
• Feasibility, risks, complexity and impact regarding the potential changes are systematically
evaluated and documented.
• Modification and potential alternatives are documented.
• Acceptance Criteria for confirming implementation are established (e.g., selection of existing
regression test case(s), newly developed test case, review of all modified work products).
• The change request is compliant with agreed regulations and policies.
The analysis of change requests should be capable of identifying affected work prod-ucts. The
process performance indicator PA 1.1 of this process therefore should reflect the importance of
the analysis result.

---

<!-- Page 166 -->

Rating rules:
[SUP.10.RL.1] If the analysis omits to address potential side effects, the indicator BP2 shall not
be rated F.
[SUP.10.RL.2] If the identification and recording of changes (BP1) is rated P or N due to
insufficient content, then BP2 shall be downrated.
3.26.2.3 Decision authority
Due to often more sensitive information such as actual efforts, timelines, delegation,
subcontracting or different stakeholders participating, the formation of a decision authority may
become mandatory.
This decision authority, which is for simplification considered as change control board (CCB) is
expected to cover these aspects:
• All affected disciplines are appropriately represented.
• All required stakeholders are represented (e.g., project manager, tester, customer sales
manager, Product Owner).
• The participants have the necessary authority to take decisions.
• CCB takes decisions in time, delegates issues if necessary.
• Agreement and approval in suitably timely manner, for supporting the alignment of changes
with planned releases. (see SPL.2 BP1).
• Dependent on the organizational/project structure and/or constraints (e.g., platform
responsibility, budget, effort), there may be multiple CCB's, for example hierarchical or
organizational CCBs which may have to be represented as well.
A decision authority depends on analysis results for its approval and can be expected to provide
its share, but not to provide a verification or repetition of such analysis results.
Rating rules:
[SUP.10.RL.3] If not all relevant disciplines or stakeholders are represented in the approval
authority the indicator BP3 shall not be rated F.
[SUP.10.RL.4] If it is apparent that approval decisions are not taken or not taken in time without
justification, the indicator BP3 shall be downrated.
[SUP.10.RL.5] If the analysis of the change request (BP2) is rated P or N, the indicator BP3 shall
not be rated higher.

---

<!-- Page 167 -->

3.26.2.4 Parallelism and traceability of change requests
Change request management often creates parallel work activities, for example chang-es
relating to other change requests, work products, problems, etc. This parallelism may be reflected
in handling, linking of parallel or parent/child relationships of change requests to each other or
even to tasks and problems.
Such parallelism may quickly become complex, challenging the management of all related
disciplines and processes throughout the different states or workflow of them until closure.
Traceability of change requests should enable a structured handling of such a parallelism. The
process performance indicator PA 1.1 of this process should reflect the impoㄱtance of the
traceability.
Rating rules:
[SUP.10.RL.6] If the rating of establishing bidirectional traceability (BP4) is downrated due to
missing dependencies between change requests and affected work products, the indicator BP2
shall be downrated.
3.26.2.5 Confirmation of implementation
When confirming change request after implementation the following aspects may need to be
considered:
A review of the implemented change requests ensures that all relevant processes (e.g., SYS,
SWE, MLE, MAN, and SUP) are applied and corresponding work prod-ucts are updated
accordingly.
• Subsequent activities, actions and tasks are reflected, such as trainings, inspect and adapt
meetings, reporting, etc.
Rating rules:
[SUP.10.RL.7] If the confirmation of implemented changes misses that relevant pro-cesses are
not applied, the indicator BP5 shall be downrated.
[SUP.10.RL.8] If the confirmation of an implemented change request is not including agreed
acceptance criteria or policies, the indicator BP5 shall be downrated.

---

<!-- Page 168 -->

[SUP.10.RL.9] If the analysis of change requests (BP2) is rated P or N due to missing information
regarding their implementation confirmation, the indicator BP5 shall be downrated.
3.26.2.6 Track change requests to closure
Any change request action is to be tracked to closure of which there may be more than one final
state. Final closure may depend on feedback from the initiator of the change itself which should
therefore be sought in early and objective evaluation, for example in system demos or inspection
meetings.
Rating rules:
[SUP.10.RL.10] If the initiator of the change request is not sufficiently authorizing the closure of
the change and this is substantial in regard to the project, the indicator BP6 shall be downrated
accordingly.
[SUP.10.RL.11] If the initial recording of change requests (BP1) is rated P or N due to missing
information about the initiator or reason, the indicator BP6 shall be downrated.

---

<!-- Page 169 -->

3.27 SUP.11 Machine Learning Data Management
The purpose is to define and align ML data with ML data requirements, maintain the integrity and
quality of all ML data, and to make them available to affected parties.
3.27.1 General information
Machine learning needs data for the training process of MLE.3 and the testing activities of MLE.4.
To ensure success of the training process, data of a controlled quality are required which are
aligned with the ML data requirements of MLE.1.
Because of cost and effort, ML data are often not only collected and categorized for usage in a
single project. Instead, data collection and categorization might be performed continuously by a
dedicated organizational entity. A project would then make use of the ML data pool provided by
the organization.
SUP.11 Machine Learning Data Management is related only to the data management activities
which are required by the MLE process group of the assessed project.
3.27.2 Rating rules within the process
3.27.2.1 Establish an ML data management system
The management of ML data requires an ML data management system which includes a suited
lifecycle management to mark the status of a data item. This system could be in simple cases
reduced to a storage system and metadata maintained on the data itself, provided the file type
supports metadata.
The assessor needs to judge the suitability of this ML data management system based on the
ML data requirements and the amount of data collected for the ML training and test.
For the rating, the assessor needs to understand especially the interfaces to provide and
categorize data.
E.g., object detection in video might require a way to label video sequences by compa-ny
external workers for supervised training. Reinforcement learning might require an interactive
approach (e.g., question answering) to judge the correctness of output created by the model
which in this case could be part of SUP.11 depending on the setup even if the judgement is part
of the MLE.3 Machine Learning Training process. In both cases, the ML data management
system must generally provide an opportunity to import all data and store it.

---

<!-- Page 170 -->

[SUP.11.RL.1] If required ML data management activities are not supported by the ML data
management system then SUP.11.BP1 shall be downrated.
3.27.2.2 Develop an ML data quality approach.
ML data with known quality is an important factor for the success of the MLE group. This requires
an approach which defines the ML data quality criteria to be met and how to check that the ML
data satisfies the ML data quality criteria. One important aspect of ML data quality criteria is the
avoidance of biased data. Biases to avoid may include sampling bias (e.g., gender, age) and
feedback loop bias.
Usually, the amount of data required for the ML training and test is so high, that the analysis of
the quality of the ML data uses statistical methods.
ML data quality criteria shall be defined before data is used for the ML processing/ training.
Examples of ML data quality criteria are relevant data sources, reliability and consistency of
labelling, completeness against ML data requirements.
3.28 MAN.3 Project Management
The purpose is to identify and control the activities, and establish resources necessary for a
project to develop a product, in the context of the project's requirements and constraints.
3.28.1 General information
The purpose of the process Project Management is to cover all aspects of planning, monitoring
and tracking.
In Automotive SPICE 4.0 all planning activities are covered in MAN.3 Project Management and
PA 2.1 Process Performance Management attribute of the respective pro-cesses.
Release planning and the management of release baselines represent the determining of
functional content to be implemented and are addressed in SPL.2 Product Release and SUP.8
Configuration Management.

---

<!-- Page 171 -->

3.28.1.1 Changed concept in Automotive SPICE 4.0
(define and monitor)
The formulation "define and monitor" is used for the base practices BP4 (work packag-es), BP5
(estimates and resources), BP6 (skill, knowledge and experience), BP7 (interfaces and
commitments), and BP8 (schedule).
The term "define" addresses the setup of artifacts or documented information where the term
"monitor" covers the continued reevaluation of artifacts and documented information.
To ensure consistency, adjustment is done based on issues found in monitoring of all of the
above mentioned aspects. Consistency here means that all planning aspects demonstrate
feasibility of the project.
3.28.2 Rating rules within the process
3.28.2.1 Scope of work
The scope of work has to cover the motivation (goals), the boundaries including project and
product scope, and the constraints of the project. Describing only the product to be developed is
not sufficient.
Rating rules:
[MAN.3.RL.1] If the scope of work (BP1) is a product description only, the indicator BP1 shall not
be rated higher than L.
[MAN.3.RL.2] If the scope of work (BP1) is not appropriately documented and updated during
project life cycle, the indicator BP9 shall not be rated higher than L.
[MAN.3.RL.3] If the required content of the scope of work (BP1) is distributed over several work
products, the indicator BP1 shall not be downrated.
3.28.2.2 Defining project planning artifacts
Based on the scope of work the project life cycle (BP2) is defined that is appropriate to the size,
complexity and the context of the project. The life cycle defines major milestones of the project
like project start, sample deliveries or start of production and it defines the development phases.
The life cycle may be standardized on organizational

---

<!-- Page 172 -->

level and adapted to project specific conditions or developed solely for one particular product
development.
It is not always recommendable to set up a detailed work package planning for the entire project
life cycle, as there are many changes to the scope of work during the conduct of a project.
Therefore, as a rule of thumb an appropriate detailed planning of work packages encompasses
the next two releases.
New concept: IIC work package (instead of work breakdown structure) work packages can also
be:
• tickets in a tracking system
• entries in a planning tool
• cards on a kanban board.
Dependencies of work packages have to be documented in the work package definition. Usually
this includes a precondition that must be present before starting the work package and/or a
certain output that serves as precondition for another work package.
Dependencies become critical when they include a certain risk of missing project milestones.
The planned effort for work packages shall be determined based on a reproducible estimation.
Not acceptable examples are a simple "best guess" by project manager or estimates by a single
person only without any further review, or without involvement of affected parties.
Another aspect which has to be considered is an adequate size of the work packages. The size
of the work packages should not exceed the time of one, max. two monitoring cycles to ensure
proper monitoring of the work packages. As an alternative the monitoring of work packages refers
to defined status information to evaluate the degree of completion.
The necessary resources should include e.g., people, development tools, hardware samples,
infrastructure and test equipment.
Skills are specific characteristics of people like the ability to communicate, to learn new things,
leadership etc. Knowledge includes also process, project and product specific training.
Experience is a result of long-term practicing certain activities.

---

<!-- Page 173 -->

Interfaces (BP7) of the project can be
• development partner such as
other development parties contracted by customer, working on the same system
other development parties contracted by the assessed organization, working on the
same system, see ACQ.4
the customer, working on the same system
• internal departments (sales, purchasing, quality management etc.)
• service provider (for e.g., infrastructure, cloud services)
• platform development
• other development sites.
For all the interfaces that have an impact on the results of the assessed project, the commitments
have to be documented and monitored. In case of any deviation an esca-lation mechanism shall
be effective.
Rating rules:
[MAN.3.RL.4] If the dependencies between work packages are not identified, the indicator BP4
shall not be rated higher than L.
[MAN.3.RL.5] If any of the following:
• start and end date,
• planned effort and actual effort,
• correction of effort or end date if work package is not completed on time
is missing for work packages, the indicator BP4 shall not be rated higher than P.
[MAN.3.RL.6] If the estimation approach used and the origin of the estimates are not reasonable,
the indicator BP5 shall not be rated higher than P.
[MAN.3.RL.7] If the size of work packages is larger than two monitoring cycles of the project and
the progress of work packages cannot be measured, the indicator BP4 shall be downrated.
[MAN.3.RL.8] If critical dependencies in the schedule are not determined, the indicator BP8 shall
be downrated.

---

<!-- Page 174 -->

[MAN.3.RL.9] If training for process, project and product specific topic is not provided to project
participants the indicator BP6 shall be downrated.
[MAN.3.RL.10] If more than two development partners are involved and agreements and
commitments are not documented and signed the indicator BP7 shall be downrated.
3.28.2.3 Monitoring
A proper monitoring cycle ensures a timely detection of deviations regarding work packages (BP4),
estimates (BP5), skill, knowledge and experience (BP6), agreed interfaces and commitments
(BP7), and schedule (BP8). As a rule of thumb a weekly monitoring is in most the cases
appropriate. In the context of the project a more frequent monitoring may be necessary (e.g.,
when project is in task force mode). The monitoring of skills, knowledge and experience may be
decoupled from the monitoring of the other planning aspects.
Tracking of corrective actions may also be linked to SUP.9 Problem Resolution Management.
Rating rules:
[MAN.3.RL.11] If the monitoring cycle is not appropriate to detect deviations of planned versus
actual planning items, the respective indicators for monitoring (BP4, BP5, BP6, BP7, BP8) shall
not be rated higher than P.
3.28.2.4 Actual project progress
In practice a project manager cannot resolve all issues that arise during project monitoring.
Resource issues are frequently decided by higher level management, schedule deviations may
be discussed with the customer. It is essential for the success of a project that mechanisms for
communication and escalation with all involved stakeholders are effective.

---

<!-- Page 175 -->

3.28.2.5 Release management
Releases and their management are not dealt with in a single process only but represent a topic
distributed across several processes:
• Generally, the project has to define which information, work products, and products have to
be delivered to, or received from all relevant stakeholders (MAN.3.BP7).
• The planning of releases is based on the work packages (BP4), and the schedule (BP8) in
MAN.3 and on the release plan in SPL.2 Product Release.
• The release must be built from configured items (SPL.2.BP4) which relates to configuration
management that ensures integrity (SUP.8). Deadline information of prod-uct releases will
be part of schedules (MAN.3.BP8).
• Release planning is also covered in the requirements processes (SYS.2.BP2, SWE.1.BP2,
HWE.1.BP2 and MLE.1.BP2) which expect a mapping of requirements to specific releases
(see note of those BPs).
Rating rules:
[MAN.3.RL.12] If product release deadlines or milestones are not consistent with the release
scope, the indicators BP8 and BP9 shall be downrated.
[MAN.3.RL.13] If for the current and next release the expected activities are defined and
monitored completely, the indicators BP4 and BP8 shall not be downrated.
[MAN.3.RL.14] If links between different types of planning information are not supported by tools,
this shall not be used to downrate the indicator BP9.
3.28.2.6 Consistency of planning information
For the rating of the project management process it is important that the definition and
monitoring of project attributes like work packages, estimates and resources, project interfaces
and dependencies will be evaluated individually.
All these attributes have strong dependencies that require to maintain consistency between them.
Therefore the adjustment of project management work products is combined into one Base
Practice in order to ensure consistency.
Activities of the master project and subprojects have to be aligned and consistent, e.g., project
plans for the different engineering domains. Dependencies between these plans have to be
easily identified and mapped. Adjustments to activities have to be considered in all relevant
planning artifacts.

---

<!-- Page 176 -->

For project management, explicit links between e.g., plans and schedules are not required.
Consistency can be reached by comparing planned versus actual and if needed adjusting planning
information.
Rating rules:
[MAN.3.RL.15] If planning information of subprojects is not consistent with the overall planning
the indicator BP9 shall be downrated.
3.28.2.7 Estimation of change requests and problem resolution
In the course of an automotive development, change requests, risk treatment activities, problems,
quality issues and defect removals can be anticipated. This needs to be reflected in the project
planning information.
Rating rules:
[MAN.3.RL.16] If the definition of work packages, effort and resources, and the definition of
schedule(s) do not sufficiently reflect change requests, risk treatment activities, problems, quality
issues and defect removals, the indicators BP2, BP8 and BP5 shall be downrated.
3.28.3 Rating rules with other processes
Rating rules:
[MAN.3.RL.17] If the definition of risk treatment activities (MAN.5.BP5) is downrated due to
incomplete definition of risk treatment activities then the indicator BP4 shall be downrated.
[MAN.3.RL.18] If the definition of risk treatment activities (MAN.5.BP5) is downrated due to
insufficient identification of required project resources for risk treatment activities, then the
indicator BP5 shall not be rated higher than L.

---

<!-- Page 177 -->

[MAN.3.RL.19] If one of the related BPS in the requirement processes for system (SYS.2.BP3),
hardware (HWE.1.BP3), software (SWE.1.BP3) or machine learning (MLE.1.BP3) is downrated
due to a missing or incomplete analysis regarding technical feasibility, the indicator BP3 shall be
downrated.
[MAN.3.RL.20] If one of the related BPs regarding status of configuration items (SUP.8.BP6) or
regarding the status of problems (SUP.9.BP7) is downrated due to a missing or incomplete report,
the indicator BP10 shall be downrated.
[MAN.3.RL.21] If one of the related BPs regarding tracking of problems (SUP.9.BP6) or regarding
tracking of change requests (SUP10 BP6) is downrated due to a missing or incomplete status
tracking, the indicator BP4 shall be downrated.

---

<!-- Page 178 -->

3.29 MAN.5 Risk Management
The purpose is to regularly identify, analyze, treat and monitor process related and product related
risks.
3.29.1 General information
Development projects have to deal with events or incidents that potentially have a negative
impact on achieving the project goals e.g., in terms of schedule, cost, quality, and functional
content. In Automotive SPICE such events and incidents are called "undesirable events".
To perform an effective risk management for the development project it is necessary to
determine the risk management scope. This includes potential incidents that can occur during
the project life cycle, regarding the activities performed under responsibility of the project,
regarding relevant work products or regarding resources of the project. The risk scope is strongly
dependent on the context of the project.
3.29.2 Rating rules within the process
3.29.2.1 Sources of risks
Risk management should consider at least processrelated and product-related unde
sirable events for which the risk has to be evaluated.
Examples for processrelated undesirable events are:
• schedule deviations
• project progress not according to the plan
• unavailability of resources including human resources
• commitments from development partners not fulfilled.
Examples for product-related undesirable events are:
• defects delivered to customer
• chosen platform is not suitable for customer application missing requirements
• impact of changes to system behavior.

---

<!-- Page 179 -->

Rating rules:
RATING GUIDELINES ON PROCESS PERFORMANCE (LEVEL 1) 179
[MAN.5.RL.1] If risk management does not consider processrelated undesirable events, the
indicator BP1 shall be downrated.
[MAN.5.RL.2] If risk management does not consider product-related undesirable events, the
indicator BP1 shall be downrated.
[MAN.5.RL.3] If undesirable events and sources of risks are not updated on a regular basis the
indicators BP1 shall not be rated higher than P.
[MAN.5.RL.4] If risks are not monitored and updated regularly, the indicator BP6 shall be
downrated.
3.29.2.2 Identify potential undesirable events and determine risks
For risk identification, knowledge of, and experience with, the product, its operating environment
and the project must be available. Also, reuse of components from former projects may involve
product-related risks.
To evaluate the risk (of an undesirable event) all possible influencing effects have to be
considered. The risk is characterized by probability of occurrence and the severity of impact that
is related to potential undesirable events. The characterization supports the prioritization of risks
and their mitigations. Usually, probability and severity are rated according to a discrete scale (e.g.,
"high", "medium", "low") that is easy to understand and to reproduce. These ratings are then
combined to represent a risk value.
Rating rules:
[MAN.5.RL.5] If aspects of reused development results are not considered in the identification
of undesirable events, MAN.5.BP2 shall be downrated.
[MAN.5.RL.6] If severity of impact and probability of occurrence of undesirable events are not
evaluated in a reproducible way the indicator BP3 shall be downrated.

---

<!-- Page 180 -->

3.29.2.3 Risk treatment
The risk value is the basis for prioritization of the risks and for the application of risk treatment.
For potential incidents with low risk value risk treatment can be limited to monitoring of the risk.
Concepts for risk treatment may include:
• experiences from problem resolution to avoid reoccurrence
• experiences from previous projects
• accepting the risk
• transferring the risk
counter measures to reduce the impact or the probability of the risk.
When risk mitigation failed and the incident occurs the Problem resolution process is typically
applied to solve the problem.
Rating rules:
[MAN.5.RL.7] If the definition of risk treatment activities is not suitable to evaluate the progress
and effectiveness of risk treatment activities, then BP5 shall not be rated higher than P.
3.29.2.4 Monitor risks
Risk monitoring has to be performed regularly in relation to the project milestones and the release
plan.
Rating rules:
[MAN.5.RL.8] If monitoring of risk and progress of the mitigation activites is not performed
regularly (e.g., synchronized with project monitoring cycle), then BP6 shall not be rated higher
than L.

---

<!-- Page 181 -->

[MAN.5.RL.9] If BP4 is downrated due to missing risk treatment options, the indicator BP5 shall
be downrated.
3.29.3 Rating rules with other processes

---

<!-- Page 182 -->

None.
3.30 MAN.6 Measurement
The purpose is to collect and analyze data relating to the work products developed and processes
implemented within the organization and its projects, to support effective management of the
processes.
3.30.1 General information
As MAN.6 Measurement was not included in the former VDA Scope the experience regarding
typical pitfalls in applying this process in an assessment is very limited. Therefore, in this
guideline the number of rating rules for this process is rather low.
3.30.2 Rating rules within the process
3.30.2.1 Key metrics
To understand the behavior of processes, their characteristics and limitations it is necessary to
measure certain key metrics. These metrics shall reflect information needs of the management.
Examples of information that may be used in process related metrics are:
• lead time
• resource consumption
• review coverage and verification coverage vs. defects.
For each metric the following have to be documented:
• the formula (if applicable),
• input data,
• frequency of reporting, and
• the control limits or threshold values.
Rating rules:
[MAN.6.RL.1] If the metric specification is completely documented in terms of the top-
ics listed above, BP2 shall be not be downrated.

---

<!-- Page 183 -->

3.30.2.2 Information needs
The information needs should be aligned with the stakeholders and decision makers.
For decision making a review of the analysis and interpretation of the collected metric
is needed.
Rating rules:
[MAN.6.RL.2] If BP1 is downrated because there is no involvement of the decision makers, the
indicators BP5 and BP6 shall be downrated.
[MAN.6.RL.3] If the analysis and the interpretation of the metrics are not reviewed before
decision making, BP4 and BP6 shall be downrated.
3.30.3 Rating rules with other processes
None.

---

<!-- Page 184 -->

3.31 PIM.3 Process Improvement
The purpose is to continually improve the organization's effectiveness and efficiency through the
processes used and ensure alignment of the processes with the business needs.
3.31.1 General information
As PIM.3 Process Improvement was not included in the former VDA Scope the experience
regarding typical pitfalls in applying this process in an assessment is very limited. Therefore, in
this guideline the number of rating rules for this process is rather low.
3.31.2 Rating rules within the process
3.31.2.1 Process improvement application
Process improvement is established in the automotive industries and known e.g., as "lessons
learned processes" or "continuous improvement". In the context of Automotive SPICE it is
important to act in a structured way.
The process improvement process is applicable e.g., to:
• achieving a target capability profile
• internal process optimization
• remove particular weaknesses in process performance
• activities to achieve target performance determined from MAN.6 Measurement.
3.31.2.2 Improvement goals
A clear improvement goal shall be committed and defined. Improvement goals shall be
communicated within the organization.
Rating rules:
[PIM.3.RL.1] If there is no commitment regarding the improvements, BP1 shall not be rated
higher than P.
[PIM.3.RL.2] The rating of BP5 shall be in line to the rating of BP2.

---

<!-- Page 185 -->

3.31.3 Rating rules with other processes
Rating rules:
[PIM.3.RL.3] If the indicator BP5 is downrated due to incomplete planning and perfoㄱmance of
process improvement activities within scope of a project, then MAN.3.BP4 shall be downrated.
[PIM.3.RL.4] If the identification of process improvement measures does not consider aspects
of improvements identified in SUP.1.BP6, PIM.3.BP2 shall be downrated.

---

<!-- Page 186 -->

3.32 REU.2 Management of Products for Reuse
The purpose is to ensure that reused work products are analyzed, verified, and approved for their
target context.
3.32.1 General information
As REU.2 Management of Products for Reuse was not included in the former VDA Scope the
experience regarding typical pitfalls in applying this process in an assessment is very limited.
Therefore, in this guideline the number of rating rules for this pro-cess is rather low.
The reuse of components is in the automotive business a common method to establish
sustainable development. It is important to reflect this aspect according to the context of a project.
For aspects of reuse of components please also check chapter 2.3.3.
3.32.1.1 Analysis of reused products
The analysis of reused products shall respect the current functional and nonfunctional
requirements, environment, and stakeholder expectations.
As result of the analysis constraints and needed qualification for the product shall be defined.
3.32.1.2 Ensure qualification of products for reuse
Reused products have to be evaluated to determine if they are relevant for the risk management
scope unless the qualifying is not finished
3.32.2 Rating rules within the process
Rating rules:
[REU.2.RL.1] If the analysis of the reuse capability of the product does not consider constraints
of the target architecture, BP2 shall not be rated higher than P.
[REU.2.RL.2] If the constraints and defined qualification for the reused product is not based on
the analysis (BP2), then BP3 and BP4 shall be downrated.

---

<!-- Page 187 -->

3.32.3 Rating rules with other processes
Rating rules:
[REU.2.RL.3] If MAN.5.BP1 is downrated due to not considering reuse products in defining risk
sources then REU.2.BP4 shall be downrated.

---

<!-- Page 188 -->

4 Rating guideline on
process capability level 2
The previously described performed process is now implemented in a managed fash-ion
(planned, monitored and adjusted) and its work products are appropriately estab-lished,
controlled and maintained.
On capability level one processspecific indicators are used to evaluate the extent to which the
outcomes of the process are achieved. Assessors regularly use the base practices to assess a
project's capability. These are activity-based indicators. In addition, there are information items
which are result-oriented indicators. Guidance on possible content of the output work products
is documented in Annex B of Automotive SPICE.
At higher capability levels, generic practices and related information items are available as
indicators. As the names imply, these indicators are not processspecific and have to be used for
all processes. Hence, they must be interpreted for each single process individually.
On capability level 1 the intent is to achieve the purpose of the process. Therefore, the assessor
judges whether the result of the process is appropriate with respect to the context of the project
including achievement of all outcomes.
On capability level 2 all activities which contribute to the purpose of the process and to the
achievement of capability level 2 itself (like e.g., reviews) have to be planned and controlled. All
resulting work products have to be considered regarding configuration management and quality
assurance.
Additionally, on capability level 2, objectives (e.g., planning goals) and strategies for the activities
which must be planned for the assessed process have to be defined and doc-umented. Also,
requirements for all relevant work products of each process must be defined. These requirements
include such information as content and structure (e.g., as table of contents), history, layout, etc.
Very often, the requirements for a work product are documented as a work product template
including instructions for the usage of the template. If tools are used it should be documented
how the tools must be used, e.g., which fields are mandatory and which are optional.

---

<!-- Page 189 -->

There is a strong dependency between MAN.3 Project Management and process attribute PA 2.1
Process Performance Management. Regarding the process attribute PA 2.2 Work Product
Management there is a strong dependency to SUP.1 Quality Assurance and SUP.8 Configuration
Management. For details refer to the chapters on PA 2.1 and PA 2.2 below.
4.1 PA 2.1 Process Performance Management
The process performance management process attribute is a measure of the extent to which the
performance of the process is managed.
4.1.1 General information
As a basis for a repeatable and sustainable process performance management, first the
objectives for the performance of the process need to be identified. A process peㄱformance
objective provides the starting point for detailed processspecific planning. This in turn is the basis
for tracking and adjusting the process performance.
The process performance strategy defines the operational approach supporting the achievement
of the process performance objectives and considering the scope of the process application. In
the PAM, the process performance strategy is defined as an information item as part of process
attribute PA 2.1.
PA 2.1 relates to the specific process. On contrast, the ability of a project to plan, monitor, and
adjust for the overall project (i.e., across processes and domain) to reach the project's goals is
the purpose of the Project Management process (MAN.3). However, there is a relationship
between process performance management attribute PA 2.1 of the different processes and
MAN.3. Therefore, the guidelines provided for Project Management (MAN.3) should be
considered correspondingly for PA 2.1 (e.g., granularity of activities, frequency of monitoring
activities).
In contrast to capability level 3, explicit process descriptions are not required for fulfill-ing PA 2.1
and PA 2.2 as long as the PA achievements are met.

---

<!-- Page 190 -->

4.1.2 Rating rules within the process attribute
4.1.2.1 Identify the objectives for the performance of the process
(GP 2.1.1)
Process performance objectives need to be defined as a basis for the detailed planning (see GP
2.1.2). They are not a repetition of process outcomes at capability level 1. In this respect,
performance objectives target how to organize the establishment of the process outcomes.
The definition of process performance objectives can be done based on the SMART principles
(specific, measurable, achievable, relevant and timebound).
Process performance objectives can either be quantitative (e.g., requirements to be implemented
for specific releases, maximum/minimum efforts to be spent) or qualita-tive (e.g., adherence to
an Automotive SPICE capability level). However, the defined quantitative process performance
objectives do not require process measurements as defined in MAN.6 or Automotive SPICE
capability level 4.
Examples are:
• effort, costs, or budget targets (e.g., min & max limits)
• processspecific deadlines for work packages, or frequency of activities (e.g., dates for
processspecific work packages)
• metric-oriented objectives e.g.
- for SUP.10: max. number of open change requests 6 weeks before the next product
release
- for SUP.8: not more than 60% of configuration items in status "in work" two months
before next delivery baseline.

---

<!-- Page 191 -->

Based on, but also complementing, the identified process performance objectives, a strategy is
defined. A strategy addresses:
• the operational approach, e.g.
proceedings, including the monitoring of the performance of the process
methodology
• the strategy scope within the process, e.g.
development sites
application domainspecific differences (e.g., software drivers vs. powertrain software)
disciplines (such as SUP.8 differently for software and hardware, or a combined approach)
options due to socio-cultural differences.
This leads to the following rating rules for the indicator GP 2.1.1 in relation to process
performance objectives:
Rating rules:
[PA2.1.RL.1] If a standard process does not include standard or generic objectives, but process
performance objectives have been defined, then GP 2.1.1 shall not be downrated.
4.1.2.2 Define a strategy for the performance of the process (GP
2.1.1)
The process performance strategy defines the operational approach in terms of pro-ceedings
and methodologies supporting the achievement of the process performance objectives
considering the scope of the process application.
A strategy can be represented by:
a) presentation slides of an organizational unit describing the purpose and objec-tives of their
individual processes and providing sufficient explanation of corresponding proceedings
b) existence of tools that enforce certain workflows (e.g., including user interfaces with
mandatory or restricted edit fields, attributes in a document management, configuration or
change request management system)

---

<!-- Page 192 -->

c) automated (or partially automated) workflows implemented by tools and scripts,
e.g.
automatically generated test result report frame with traceability links to the test case
specification
build tools including mandatory static software verification
continuous integration approaches
continuous delivery approaches
d) an appropriate media source such as a photo of a whiteboard drawing, video or podcast
explaining key elements of the process performance.
A process performance strategy does not necessarily have to be documented for each process
separately. The strategy does not have to be described in a specific document either.
Common and useful practices are to document strategy elements applicable to multiple
processes in joint documents, e.g.
• joint test strategy for system testing related processes
• joint change request and configuration management strategies (as change requests are
to be placed against concrete versions of artifacts or entire product baselines)
communication strategies of several processes in a common project manual.
• Adherence to a given strategy and the effectiveness of the strategy are essential.
However, the existence of a documented strategy does not necessarily ensure that the
strategy is established and effective.
Therefore,
• the necessary comprehensiveness, and detail of information indicated by the examples
above is always context-dependent.
• people interviewed (besides the author of the strategy) shall be independently able to
demonstrate the knowledge and awareness of the strategy.
It is the responsibility of the assessors to check whether an existing strategy is also effective.
Note that the definition and existence of documented information related to a strategy is not
relevant for the rating of PA 1.1 of the process.
If process performance objectives and aspects of the strategy are derived from an ex-isting
standard process, the suitability of this standard process's objectives and strategy for the
specific project context needs to be considered. Still, the definition of stand-

---

<!-- Page 193 -->

ard objectives and standard strategies in a standard process according to capability level 3 is not
required for GP 2.1.1.
This leads to the following rating rules for the indicator GP 2.1.1:
Rating rules:
[PA2.1.RL.2] If a standard process including a standard or generic strategy does not exist, but a
strategy is effectively adhered to, then GP 2.1.1 shall not be downrated.
[PA2.1.RL.3] If a strategy is not documented in a specific document, but there is evidence of the
strategy adhered to by all relevant parties, then GP 2.1.1 shall not be downrated.
[PA2.1.RL.4] If the strategy is not described in a single processspecific document, but strategies
of different processes are combined in one document, then GP 2.1.1 shall not be downrated.
[PA2.1.RL.5] If a documented process performance strategy does not exist, but there is evidence
that an effective strategy is followed, then PA 1.1 shall not be downrated.
4.1.2.3 Plan the performance of the process (GP 2.1.2)
To ensure a proper planning for the process performance, the following aspects can be
considered for the detailed planning based on the performance objectives, and consistent with
the strategy:
• a schedule with activities for the considered deadlines and their start date, due date, effort,
assigned resources (typically e.g., for engineering activities), sequence, and dependencies.
• Alternatively, some activities represent "background tasks" or are event-triggered (e.g.,
check-in/check-out activities in configuration management, addressing change requests in
change management, progress tracking in project management). These are usually not
planned to be performed at particularly foreseeable points in time. For such activities,
defining an effort percentage for e.g., allocated human resources can be sufficient.
• Estimates for e.g., effort, size of work products are to be reasonable and reproducible.
Reasonable buffer time (e.g., for bug fixing, vacation) needs to be planned.
Planning must include the at least activities related to process performance (PA 1.1), process
performance management (PA 2.1 e.g., planning and monitoring of the pro-cess) and work
product management (PA 2.2., e.g., review of work products).

---

<!-- Page 194 -->

Evidence of the planning can be visible in, but not restricted to, e.g.
• schedule(s)
• ALM or PLM tools
• openitem list or backlogs
• task board (such as Kanban board)
• separate documents (e.g., in a meeting plan as part of a general stakeholder communication
matrix).
Planning may not necessarily be documented specifically for each process in distinct documents.
For example:
• A project-wide schedule or work breakdown structure (according to MAN.3) may contain the
activities of the individual processes.
• A project-wide effort estimation (according to MAN.3) may include estimates for the
individual processes.
• A central department for system testing (according to SYS.5) plans the test
engineering/execution activities in one document, but allocation of the infrastructure und
equipment is planned in another document or tool.
However, processspecific planning may also be documented in one particular/single document
for the process. Achieving PA 2.1 does not require a process description. GP 2.1.2 only requires
the existence of a detailed planning based on the performance objectives and the strategy.
Organizations do not need to structure the activities to be planned and monitored in a way that
resembles the PAM structure or assessment indicator structure. It is therefore the responsibility
of the assessors to map evidence to the assessment indicators of the PAM.
This leads to the following rating rules for the indicator GP 2.1.2 in relation to a process
performance strategy:
Rating rules:
[PA2.1.RL.6] If no process description is available, but all expected planning informa-tion based
on the performance objectives exists, then GP 2.1.2 shall not be downrated.
[PA2.1.RL.7] If the determination of critical dependencies of activities and work packages is not
considered in the process performance planning, then GP 2.1.2 shall be downrated.

---

<!-- Page 195 -->

[PA2.1.RL.8] If supporting activities are not planned as explicit activities but are planned as
percentage or absolute number of hours over a certain period of time, then GP 2.1.2 shall not be
downrated.
[PA2.1.RL.9] If the objectives or the strategy for the performance of the process (GP 2.1.1) is
downrated due to missing suitability to achieve the process outcomes, then GP 2.1.2 shall be
downrated.
[PA2.1.RL.10] If planning and monitoring only includes the activities for capability level 1, but not
the reviewing of work products according to GP 2.2.4, then GP 2.1.2 shall be downrated.
4.1.2.4 Determine resource needs (GP 2.1.3)
The following aspects need to be covered in the project and adequately documented:
a) the need of human resources, as well as physical and material resources, to perform the
processspecific work packages is determined based on the planned activities.
b) responsibilities, commitments, and authorities (e.g., access rights, release of work
products) to perform the process activities of the project need to be defined, assigned,
communicated, and agreed.
c) responsibilities and authorities to verify processspecific work products need to be defined,
assigned, communicated, and agreed.
d) the needed experience, knowledge, and skills are defined. Needs can either be
processspecific or product-specific, or both (e.g., methods, tooling, needed algorithms).
In distinction to GP 3.1.2 all definitions for responsibilities and authorities can be made
specifically for the process performance without considering a standard process and standard
role definitions.
This leads to the following rating rules for the indicator GP 2.1.3:
Rating rules:
[PA2.1.RL.11] If the determination of resource needs only relates to human resources, but does
not include relevant and necessary physical or material resources, then GP 2.1.3 shall not be
rated higher than P.

---

<!-- Page 196 -->

[PA2.1.RL.12] If resource needs are adequately covered but role definitions provided by a
standard process are not available, then GP 2.1.3 shall not be downrated.
[PA2.1.RL.13] If the planning of the process performance (GP 2.1.2) is downrated because of not
covering the process outcomes or the reviewing of processspecific work products (PA 2.2), then
GP 2.1.3 shall be downrated.
4.1.2.5 Identify and make available resources (GP 2.1.4)
a) The identification and provision of resources shall cover the following aspects: a) The
individuals/people required for the process performance, process perfoㄱmance
management and work product management are identified by name, and made available.
Resource planning must be reproducible (e.g., rate of utilization is transparent, absences
such as vacation and trainings are considered, procedures for planning in a matrix
organization or distributed development are defined). A comparison of needed human
resources vs. allocated resources is available and during process performance (see also GP
2.1.5)
b) The physical and material resources required for the process performance, process
performance management and work product management (e.g., tool licenses, samples, test
equipment) are made available and used. A comparison of physical and material resources
vs. allocated resources is available and maintained during project life cycle (see also GP 2.1.5)
c) The individuals performing and managing the process and work products are qualified by
e.g., training, mentoring, or coaching to be able to execute their responsibilities. A
qualification fit/gap analysis is performed. Necessary qualifica-tion measures are planned
and performed in time, according to the needs of the process.
d) The information necessary to perform the process is made available to all affected
individuals (e.g., manuals, project wiki).
This leads to the following rating rules for the indicator GP 2.1.4:
Rating rules:
[PA2.1.RL.14] If the identification and provision of resources relates to individuals only (while also
physical or material resources need to be considered), then GP 2.1.4 shall not be rated higher
than P.

---

<!-- Page 197 -->

RATING GUIDELINES ON PROCESS CAPABILITY LEVEL 2
[PA2.1.RL.15] If the indicator for determination of resource needs (GP 2.1.3) is downrated due
to inadequately or incompletely defined resource needs, then GP 2.1.4 shall be downrated.
4.1.2.6 Monitor and adjust the performance of the process (GP 2.1.5)
In order to monitor whether the process is performed according to the strategy and the planning
(see GP 2.1.1 and GP 2.1.2) or deviates, the following aspects are considered:
a) Actual data is continually compared with planned values (this means also that the
granularities of planned and actual data match), e.g.
dates against deadlines or durations
booked effort against planned effort
estimates for human resources, materials, and physical resource needs as well as needs
for skills, knowledge, and experience match the process needs.
b) The comparison between planned and actual data should:
show the current state of progress
be performed at an adequate frequency.
c) Documentation of monitoring activities, e.g., as:
status report
status meeting minutes
information in tools or repositories (including ALM or PLM tools).
In the case monitoring identifies deviations then
- these are analyzed and root causes are determined, and
- either corrective measures to align performance with plans must be taken or
- plans are adapted.
This leads to the following rating rules for the indicator GP 2.1.5:
Rating rules:
[PA2.1.RL.16] If the levels of granularity of planning and monitoring do not match in absence of
a consistent mapping in between, then GP 2.1.5 shall be downrated.

---

<!-- Page 198 -->

[PA2.1.RL.17] If the chosen frequency of monitoring activities is not capable of identifying
deviations versus plan in time (e.g., not very early before the closure of the activity), then GP
2.1.5 shall be downrated.
[PA2.1.RL.18] If the indicator for planning the performance of the process (GP 2.1.2) is downrated
due to incomplete planning of activities and work packages or missing determination of resource
needs, then GP 2.1.5 shall be downrated.
4.1.2.7 Manage the interfaces between involved parties
(GP 2.1.6)
The individuals and groups external to the process are determined.
Managing the interfaces should cover the exchange of information and work products and should
include the following aspects:
a) Responsibilities are defined e.g.
who delivers or communicates information
what is the purpose of information delivery
who are the receivers
b) the technical interfaces and media type e.g.
email notifications with direct information or links/references
meetings with minutes sent to defined distribution lists
baseline reception
tasks in ALM or PLM tools
participants for the meetings are defined (depending on responsibilities, tasks, or processes)
the triggering mechanism is defined (push/pull)
c) Communication between the involved parties is established, managed, maintained and
effective in a repeatable fashion. This includes defining when how frequent communication is
done.

---

<!-- Page 199 -->

4.1.3 Rating consistency
4.1.3.1 Rating consistency within PA 2.1
The following figure shows relationships among GP 2.1.x generic practices:
4.1.3.2 Rating consistency with other processes and practices
During the assessment and in terms of the consistency of the assessment ratings, deendencies
between PA 2.1 and assessment indicators of other processes are to be considered.
Accordingly, evidence obtained during the assessment needs to be analyzed regarding potential
relevance for other dependent assessment indicators. Significant rating diffeㄱences across
dependent processes and process attributes (e.g., with more than one NPLF step) might be
indicative of an inconsistent rating.
Dependencies of the PA 2.1 Process Performance Management attribute and its generic
practices to other processes are:
• The ratings of base practices 4,5,6,7,8 of MAN.3 should be in line with the ratings of GP 2.1.2,
GP 2.1.3, GP 2.1.4, GP 2.1.5, and GP 2.1.6 of the other processes.

---

<!-- Page 200 -->

4.2 PA 2.2 Work Product Management
This process attribute is a measure of the extent to which the work products produced by the
process are appropriately managed.
4.2.1 General information
Relevant work products of the process are those that are required to fully achieve ca-pability level
1, and additionally those work products required for successful implementation of the process
attributes 2.1 and 2.2.
A work product may not only be a document but also e.g., a record or repository entry in a tool
(e.g., change requests or problem reports implemented in a workflow tool are also work products).
Not included in the term "work product" are all standard processrelated documents such as
process descriptions, procedures, method descriptions, or role descriptions; these are applicable
at capability level 3 only. Therefore, any weaknesses with handling these process assets that are
not related to the content (e.g., improper versioning) must not be reflected in the process
attribute 2.2 of the process under investigation. However, if organizational process documents
are available, they can support the implementation of process attribute 2.2.
4.2.2 Rating rules within the process attribute
4.2.2.1 Define the requirements for the work products (GP 2.2.1)
Work product requirements include:
a) requirements defining content and structure, e.g.
layout, revision history, table of contents
technical content (e.g., for engineering work products, like requirement spec-ifications,
architectural descriptions, as well as management-oriented work products, such as
schedules, minutes, open point lists)
guidelines (e.g., programming or modelling guidelines)
standards

---

<!-- Page 201 -->

b) appropriate review and approval criteria, e.g.:
definition whether the work product needs to be explicitly reviewed, or is only implicitly
reviewed by distributing it and implicitly approved in case there is no feedback (e.g.,
minutes, openpoint-lists, reports etc.).
review method, review coverage (including justification), review frequency (including
justification), and review participants
c) quality criteria (based on aspects a) or b).
Very often, the requirements for a work product are documented as a work product template or
checklist. However, defining templates or checklists is not necessarily required by PA 2.2 as long
as all aspects above are adequately documented.
This leads to the following rating rules for the indicator GP 2.2.1:
Rating rules:
[PA2.2.RL.1] If templates or checklists do not exist for the work product, but content, structure,
review and approval and quality criteria are adequately covered and documented, then GP 2.2.1
shall not be downrated.
[PA2.2.RL.2] If standard work product templates provided by a standard process are available,
but there is a defined specific solution that is effective although deviating from the standard
process, then GP 2.2.1 shall not be downrated.
[PA2.2.RL.3] If standard work product templates provided by a standard process are available and
used by the process, but do not fit the purpose of the process, then GP 2.2.1 shall be downrated.

---

<!-- Page 202 -->

4.2.2.2 Define the requirements for storage and control of the
work products (GP 2.2.2)
Certain requirements regarding storage and control have to be defined for all relevant work
products. These requirements have to be set-up for each identified work product (see also
SUP.8.BP2 and chapter 4.2.3.2).
The requirements for storage and control shall cover at least these minimal required aspects:
a) identification of work products
b) naming conventions
c) ownership
d) access rights (at least read and write permission)
e) if applicable: work product status model (states and transitions), workflow, ap-proval and
release proceedings
f) versioning rules (including baselining depending on the work product type) g) storage
media (e.g., configuration management tool, ALM/PLM tools)
h) distribution channels (communication mechanisms for releases and changes).
Some of this might apply to subitems of certain work products, e.g., requirements contained in
a requirement specification may require naming conventions and status model.
The expectations for a status model and workflow definition (see aspect e) above), if applicable,
cover the following aspects:
• criteria for status changes, and relevant stakeholders together with their responsibility and
authorization, etc.
• work product status transitions follow the workflow to a final status, and are tracked
accordingly. There might be more than one final status (e.g., closed, rejected, cancelled), but
it has to be ensured that one of them is always reached (e.g., there is a status "resolved" but
the status model defines an additional step "closed" that will usually not be reached).
• work products with a very simple status definition (e.g., living documents, meeting minutes,
agendas) do not require a status model with transitions, workflow, approv-al, and release
procedure.

---

<!-- Page 203 -->

This leads to the following rating rules for the indicator GP 2.2.2:
Rating rules:
[PA2.2.RL.4] If the requirements for storage and control do not cover the minimal required
aspects, the indicator GP 2.2.2 shall be downrated.
[PA2.2.RL.5] If the requirements for storing and controlling work products do not cover versioning
and storage requirements, then GP 2.2.2 shall not be rated higher than P.
[PA2.2.RL.6] If the definition of a status model for work products with a trivial status definition
lacks definitions of workflow, criteria for status changes, stakeholder and their authorization, then
GP 2.2.2 shall not be downrated.
4.2.2.3 Identify, store, and control the work products (GP 2.2.3)
All identified work products must be stored and controlled (indicator GP 2.2.3) accord-ing to their
requirements (indicator GP 2.2.2). The following rule is defined because of this dependency.
Rating rules:
[PA2.2.RL.7] If the indicator for defining requirements for storage and control of the work
products (GP 2.2.2) is downrated, then GP 2.2.3 shall not be rated higher than that.
4.2.2.4 Review and adjust work products (GP 2.2.4)
Work product reviews have to be performed against defined work product review criteria (see GP
2.2.1) in accordance with the planning (see PA 2.1). The execution of work product reviews does
not necessarily require a formal review or inspection including a dedicated findings record but
can also follow a less formal approach such as walkthroughs, or paiㄱprogramming. However, it
is required that the following aspects must be demonstrated:
a) review information:
identification of the work product under review (including name and version)
date of the review
name(s) of reviewer(s)

---

<!-- Page 204 -->

4.2.3 Rating consistency
4.2.3.1 Rating consistency within PA 2.2
The following figure shows relationships among GP 2.2.x generic practices:
The generic practices of capability level 2 can be grouped into two main topics. The first one
covers requirements, quality criteria, review, and adjustment of all relevant work products of the
corresponding process (GP 2.2.1 & GP 2.2.4), whereas the sec-ond one covers the storage and
control of those work products (GP 2.2.2 & GP 2.2.3).
4.2.3.2 Rating consistency with other processes and practices
During the assessment and in terms of the consistency of the assessment ratings, the
dependencies between PA 2.2 and assessment indicators of other processes and practices need
to be considered. Accordingly, evidence obtained during the assessment needs be analyzed
regarding potentiel relevance for other dependent assessment indicators.
Dependencies of the work product management attribute PA 2.2 and its generic prac-tices to
other processes are:
• The rating of SUP.1.BP2 should be in line with the ratings of GP 2.2.1 of the other processes.
• The rating of SUP.1.BP3 should be in line with the ratings of GP 2.2.4 of the other processes.
• The rating of SUP.8.BP2 should be in line with the ratings of GP 2.2.2 of the other processes.
• The ratings of SUP.8.BP4 and SUP.8.BP5 should be in line with the ratings of GP 2.2.3 of the
other processes.

---

<!-- Page 205 -->

Dependencies of the work product management attribute PA 2.2 and its generic prac-tices to
base practices of the same processes are:
• The rating of the base practice of ensuring consistency of work products for the same process
should be in line with the rating of GP 2.2.4, if review is used as a primary means for
establishing consistency (SYS.2.BP5, SYS.3.BP4, SYS.4.BP4, SYS.5.BP4, SWE.1.BP5,
SWE.2.BP4, SWE.3.BP4, SWE.4.BP4, SWE.5.BP6, SWE.6.BP4, VAL.1.BP4, MLE.1.BP5,
MLE.2.BP6, MLE.3.BP4, MLE.4.BP6, HWE.1.BP5, HWE.2.BP5, HWE.3.BP5, HWE.4.BP5,
MAN.3.BP9, SUP.8.BP7).

---

<!-- Page 206 -->

5 Rating guidelines on
process capability level 3
The previously described managed process is now implemented using a defined pro-cess that
is capable of achieving its process outcomes.
On capability level 2 all projects may use "their" own process as long as the requirements of
Automotive SPICE are fulfilled.
On capability level 3 the projects have to use a standard process. A possibility to cover variations
between projects is to describe tailoring guidelines. This derived process is the so-called
"defined" process. The defined process has to cover all activities and work products of capability
level 1 and 2 for the assessed project.
Large organizations would have problems with only one standard process. The organization may
define several different standard processes (e.g., one standard process for each development
site, or one standard for each business unit). The other possibility to cover variations between
projects is the aforementioned description of tailoring guidelines. Based on predefined criteria
the process may be tailored to the needs of the project.
Exceptionally waivers for the standard process may be used (which should not be the rule).
Assessors should check whether these exceptions have a rationale and are approved by
appropriate organizational roles.
It has to be kept in mind that the advantage of organizational processes is to standard-ize the
approach to e.g.
• establish processes known by the stakeholders
• establish interfaces to facilitate cooperation (also between different locations)
• facilitate introduction of new personnel or exchange personnel and infrastructural resources
between projects·
• facilitate reuse of assets and work products
• share good practices and lessons learned
• establish benchmarking.

---

<!-- Page 207 -->

The aim of establishing processes might get missed if there are too many variations of the
processes. This should be reflected by the assessment result.
Note that capability level 3 only addresses the standard process description and its suitability (PA
3.1), and the effective adherence to a tailoring of a standard process (PA 3.2). Capability level 3
does explicitly not address
• the configuration management of the process descriptions as a work product
• the storage of the process descriptions as a work product
• handling of process description tools or repositories
• management of human resources for process improvement.
Such aspects would have to be addressed by capability level 1 and 2 of e.g., ORG.1 Life Cycle
Model Management in ISO/IEC 33060 and 33061, respectively, or Automotive SPICE PIM.3
Process Improvement. Therefore, weaknesses regarding these aspects must not lead to any
downrating on capability level 3.
5.1 PA 3.1 Process Definition
This process attribute is a measure of the extent to which a standard process is maintained to
support the deployment of the defined process.
5.1.1 General information
The process defined is organization wide and no longer project specific. This includes at least
• a developed, established and maintained standard process including tailoring guidelines (GP
3.1.1)
• required competencies, skills, and experience for the identified roles performing the standard
process (GP 3.1.2)
• required physical and material resources and process infrastructure needs for performing the
standard process GP 3.1.3)
• suitable methods and required activities for monitoring the standard process (GP 3.1.4).
Each of these aspects has to be rated only in the respective GP.

---

<!-- Page 208 -->

5.1.2 Rating rules within the process attribute
5.1.2.1 Establish and maintain the standard process (GP 3.1.1)
GP 3.1.1 covers the definition and maintenance of the standard process including tailoㄱing
guidelines.
Definition of the standard process
In order to define the standard process, its scope, purpose and intended use must be identified
and correspondingly documented. The fundamental process elements must be covered by the
standard process such as process activities including detailed descriptions, and required
inputs/expected outputs including corresponding entry and exit criteria.
Rating rules:
[PA3.1.RL.1] If scope, purpose and intended use are missing in the standard process definition,
then GP 3.1.1 shall not be rated F.
[PA3.1.RL.2] If process activities including descriptions are missing in the standard process
definition, then GP 3.1.1 shall not be rated higher than P.
[PA3.1.RL.3] If required inputs or expected outputs of process activities are missing in the
standard process definition, then GP 3.1.1 shall not be rated higher than P.
Additionally, the sequence and interaction of process activities inside one process as well as the
sequence and interaction of the process to other processes must be identifiable. This might also
include parallel or iterative sequencing of activities, which are synchronized by e.g., work product
completion.
[PA3.1.RL.4] If the sequence and interactions of process activities within the process or to other
processes is not identifiable, then GP 3.1.1 shall not be rated higher than P.
[PA3.1.RL.5] If the sequence and interactions of process activities within the process or to other
processes is not explicitly documented as such, but is identifiable (e.g., by work product status
and entry/exit criteria), then GP 3.1.1 shall not be downrated.
In order to support the execution of the process, guidance, procedures, method descriptions,
and/or templates should be provided as needed.

---

<!-- Page 209 -->

[PA3.1.RL.6] If explicit templates for the expected outputs are not provided, but corresponding
detailed requirements regarding the expected content are existing, then GP 3.1.1 shall not be
downrated.
Process performance roles must be identified and assigned to the standard process activities
including their type of involvement (e.g., key responsibility roles by RASI/RASIC-matrix),
responsibilities, and authorities.
[PA3.1.RL.7] If process performance roles are not identified and assigned to standard process
activities, then GP 3.1.1 shall not be rated higher than P.
[PA3.1.RL.8] If the type of involvement of the process roles in the process activities is not defined,
then GP 3.1.1 shall be downrated.
Here in GP 3.1.1, only the identification of the roles including their involvement is cov-ered,
whereas the detailed role descriptions are handled in GP 3.1.2 (see next section 5.1.2.2).
[PA3.1.RL.9] If role definition details like competencies, skills, experience, or qualifica-tion
methods are missing, then GP 3.1.1 shall not be downrated.
Maintenance of the standard process
The defined standard process needs to be continuously maintained according to corresponding
feedback from monitoring the deployed process (see also GP 3.2.4 for corresponding input), and
adapted process requirements (standards, regulations, laws, changed/new infrastructure, etc.).
The maintenance should be documented in change requests and corresponding process version
numbering. The validity of process veㄱsions needs to be defined, which includes:
date for obligatory use of the latest version of the standard process for all upcoming projects
• handling of usage of new version of the standard processes or new process ele
• ments for running projects (e.g., not applicable for projects at a stage later than x)
• mechanism to ensure availability of previous process versions.
This leads to the following rating rules:
Rating rules:
[PA3.1.RL.10] If the standard process does not have a unique version identifier, then GP 3.1.1
shall not be rated F.

---

<!-- Page 210 -->

[PA3.1.RL.11] If changes between standard process versions are not documented and
identifiable, then GP 3.1.1 shall be downrated.
[PA3.1.RL.12] If it is unclear when a new version of the standard process becomes mandatory
for new projects, or by when running projects will have to switch to the new standard process,
then GP 3.1.1 shall be downrated.
Nevertheless, for a project running in a late project phase, it could make sense to not switch to
the latest version of an updated standard process. Therefore, a record of standard process
versions must be kept. This also contributes to evidence to be demonstrated in case of product
liability lawsuits.
[PA3.1.RL.13] If a project uses a former standard process version, the documentation of which
is no longer available, then GP 3.1.1. shall be downrated.
Tailoring of the standard process
Deployment can be done with or without tailoring of the standard process, which is supported
by corresponding tailoring guidelines (see also GP 3.2.1). Tailoring can be performed through
different proceedings such as deleting, adding or selection between different elements of the
process based on predefined criteria. Additionally, the responsibility for tailoring and
corresponding approval must be defined.
Rating rules:
[PA3.1.RL.14] If the tailoring guidelines do not include the responsibility for tailoring and
corresponding approval, then GP 3.1.1 shall be downrated.
In case that neither the standard process asis nor the existing tailoring guidelines cov-er the
needs of a project, a corresponding deviation can be approved as an exception (e.g., by a waiver
including rationale). In case of several approved similar deviations from the standard process, the
process either needs to be reworked, or the tailoring guidelines must be updated.
[PA3.1.RL.15] If the same or similar deviations from the standard process are regularly approved
(e.g., by waivers) without updating the standard process and/or tailoring guideline, then GP 3.1.1
shall be downrated.

---

<!-- Page 211 -->

5.1.2.2 Determine the required competencies (GP 3.1.2)
The standard process identifies and assigns required process performance roles to process
activities including their type of involvement (e.g., key responsibility roles by RASI/RASIC-matrix),
responsibilities, and authorities (see GP 3.1.1, including corresponding rating). Thus, if this is
missing, it must be downrated in GP 3.1.1, and not in GP 3.1.2.
Rating rules:
[PA3.1.RL.16] If the type of involvement of the process roles regarding responsibilities, or
authorities in standard process activities is not defined, then GP 3.1.2 shall not be downrated.
But the process roles need to be described in more detail including required competencies, skills,
and experience, which is covered by the indicator GP 3.1.2. Furthermore, appropriate qualification
methods for human resources need to be determined, maintained, and made available.
[PA3.1.RL.17] If required competencies or required skills are missing for the defined process
roles, then GP 3.1.2 shall not be rated higher than P.
[PA3.1.RL.18] If qualification methods for human resources are either not determined, or not
maintained, or not available for the defined roles, then GP 3.1.2 shall not be rated higher than P.
5.1.2.3 Determine the required resources (GP 3.1.3)
Requirements for human resources are covered by GP 3.1.2.
Rating rules:
[PA3.1.RL.19] If requirements for human resources are not determined, then GP 3.1.3 shall not
be downrated.
But other nonhuman resources like physical and material resources as well as pro-cess
infrastructure needs must be determined, which is covered by GP 3.1.3. This includes the
definition and description of the tools to be used (including qualification, if relevant, e.g., for
safety critical use) and infrastructure, methods and responsibilities to ensure that the needed
work environment is available for the projects (e.g., licenses), or also samples.
[PA3.1.RL.20] If required tools are not defined, then GP 3.1.3 shall not be rated higher than P.

---

<!-- Page 212 -->

5.1.2.4 Determine suitable methods to monitor the standard
process (GP 3.1.4)
In order to monitor the effectiveness of the actual process performance, and the adequacy of the
standard process by evaluation, corresponding methods and activities need to be defined.
Adequacy relates to meeting requirements including coverage capability level 1 and 2
expectations, compliance with internal predefined provisions, and relevant industry standards
(e.g., reflecting the state of the art, but not proprietary customeㄱspecific standards).
Successful process compliance checks or internal audits/assessments can evidence the
effectiveness of a process, whereas a lack in process compliance for a majority of projects can
evidence that the process is not effective. However, process compliance checks cannot
determine the adequacy of the standard process (e.g., relevant industry standards are not
addressed).
Lessons learned or retrospective meetings can be used to get process feedback. Feedback
should be documented in a defined way, analyzed, and be taken into account for process
development. In addition, there should be a defined and well-known way for project staff to give
process feedback to the responsible process development organization. However, lessons
learned, and project feedback may or may not include a reflection on relevant industry standards.
Automotive SPICE, being a PAM, is at the WHAT level (see Automotive SPICE PAM section 3.4).
This means it cannot predefine any method which would be a HOW Level decision. The only
directive is that, whatever methods are chosen, the process purpose of capability level 1 must
be effectively met.
Rating rules:
[PA3.1.RL.21] If the selected methods for monitoring the adequacy of the standard process
comply only with internal provisions and do not reflect relevant industry stand-ards or comparable
methods capable of achieving capability level 1, then GP 3.1.4 shall be downrated.
[PA3.1.RL.22] If continual effectiveness and adequacy monitoring is performed, but no need for
process improvements is reasonably identified, then GP 3.1.4 shall not be downrated.
[PA3.1.RL.23] If the standard process does not follow an international standard in terms of

---

<!-- Page 213 -->

naming and structuring of work products, templates, activities, and roles then GP 3.1.1, GP 3.1.2,
GP 3.1.3, and GP 3.1.4 shall not be downrated.
Furthermore, quantitative methods may be used to monitor effectiveness and/or adequacy of
the standard process (e.g., efficiency, cost). However, quantitative methods are not mandatory
on capability level 3.
[PA3.1.RL.24] If the determined standard process monitoring methods are only of qual-itative
nature, but still appropriate regarding effectiveness and adequacy, then GP 3.1.4 shall not be
downrated.
5.1.3 Rating consistency within the process attribute
No explicit consistency dependencies were identified within this process attribute, and therefore,
no corresponding rating rules were defined.
5.2 PA 3.2 Process Deployment
This process attribute is a measure of the extent to which the standard process is deployed as a
defined process to achieve its process outcomes.
5.2.1 General information
The rating of process attribute 3.2 should reflect the degree to which the process is using the
standard process considering the tailoring guidelines.
5.2.2 Rating rules within the process attribute
5.2.2.1 Deploy a defined process that satisfies the context specific
requirements of the use of the standard process (GP 3.2.1)
The deployment of a defined process should include:
• the project-specific selection and/or tailoring from the standard process using the defined
tailoring guideline and criteria. The decisions made and the rationale for the decisions need
to be documented.
• the verification that the defined process is conformant with standard process and its tailoring

---

<!-- Page 214 -->

guidelines and accordingly applied in the project. This has to be done by an authorized role,
e.g., process owner, process group, quality management or quality assurance. Evidence of
the verification or a final release of the defined process need to be documented.
Rating rules:
[PA3.2.RL.1] If the defined process is not selected, documented, and verified according to the
tailoring guidelines, then GP 3.2.1 shall be downrated.
In case that the standard process including existing tailoring guidelines is not suitable for a project
as defined process, this can be correspondingly approved as an exceptional case (e.g., by a
waiver including rationale). Therefore, the following rule must be considered:
[PA3.2.RL.2] If deviations from the standard process are independently approved based on
reasonable arguments (e.g., by a waiver), but not reflected in the tailoring guideline, then GP
3.2.1 shall not be downrated.
5.2.2.2 Ensure required competencies for the defined roles (GP
3.2.2)
Roles, responsibilities, and authorities for performing the defined process are assigned and
communicated.
Ensuring required competencies includes:
• the assurance of appropriate skills and competencies for assigned personnel. Evidence that
the assigned persons have the required qualifications (e.g., qualification records) should be
available. The qualification has to be ensured in line with the skills and competencies defined
in GP 3.1.2 for performing the standard process.
• If gaps in skills and competencies are identified, adequate qualification measures should be
defined and monitored.
• The availability of suitable qualification measures for those performing the defined process.
Availability ensures that project members are qualified in time, to perform the defined
processes in the project.
Rating rules:

---

<!-- Page 215 -->

[PA3.2.RL.3] If no evidence that the assigned persons have the required qualification is available,
then GP 3.2.2 shall not be rated higher than P.
[PA3.2.RL.4] If the necessary skills and competencies are not available in time, then GP 3.2.2
shall not be rated F.
Rationale: If a qualification measure is only planned for the future, but the qualification is required
today, the qualification is still missing.
Ensuring the availability, allocation, and usage of the project staff and related informa-tion
includes that:
• In addition to GP 2.1.4, the resources need to be available according the roles and
qualifications defined in the defined process roles.
• The availability of the resources needs to be ensured, taking into account that resources
may be also used by other projects of the organization.
• Related information about human resources should be available and include expert
knowledge from previous projects and/or training materials.
[PA3.2.RL.5] If the availability and usage of the human resources is not monitored, then GP 3.2.3
shall not be rated F.
[PA3.2.RL.6] If the availability and usage of the human resources for process improvement is not
measured and monitored, then GP 3.2.3 shall not be downrated.
5.2.2.3 Ensure required resources to support the performance of
the defined process (GP 3.2.3)
The required physical and material resources, infrastructure and work environment, according to
the standard process and the project specific definition shall be available.
Organizational support to effectively manage and maintain the resources, infrastruc-ture, and
work environment for performing the defined process shall be available and known by the project
members, such as:
• Resources for the support are planned by the organization.
• Availability of licenses is checked regularly.
• Information about anticipated or planned infrastructure changes, e.g., new tool chains, shall
be made available to the projects.
Infrastructure and work environment shall be used and maintained. If updates or new versions

---

<!-- Page 216 -->

of the work environment are available, the handling has to be planned in cooㄱdination with the
project.
Rating rules:
[PA3.2.RL.7] If the organizational support is not adequate to effectively manage and maintain the
resources, then GP 3.2.3 shall not be rated F.
The availability and usage of the resources are measured and monitored.
[PA3.2.RL.8] If the availability and usage of the resources is not monitored, then GP 3.2.3 shall
not be rated F.
5.2.2.4 Monitor the performance of the defined process (GP 3.2.4)
The performance of the defined process should ensure that:
• Information required to understand the behavior and evaluate the effectiveness and adequacy
of the defined process are identified based on the definitions in GP 3.1.4. Information about
process performance may be qualitative or quantitative.
• Information is collected and analyzed to understand the behavior of the process, and to
evaluate the effectiveness and adequacy of the defined process. The frequency and approach
for collecting and analyzing are defined.
• Results of the evaluation are used to identify where continual improvement of the standard
and/or defined process can be made. Results should be documented and made available to
all affected parties.
[PA3.2.RL.9] If the evaluation of the effectiveness and adequacy of the defined pro-cess is not
made available to all affected parties, then GP 3.2.4 shall not be rated F.
5.2.3 Rating consistency within the process attribute
No explicit consistency dependencies were identified within this process attribute, and therefore,
no corresponding rating rules were defined.

---

<!-- Page 217 -->

5.3 Rating consistency
5.3.1 Rating rules within capability level 3
PA 3.1 defines the context of standard processes. PA 3.2 is about successfully deploying what
has been defined within PA 3.1. Based on this, the following philosophy is followed in this
document: processes can only be deployed to the extent that they are defined. This means the
rating of GP 3.2.x cannot be higher than the rating of GP 3.1.x.
The following figure shows relationships between generic level 3 practices:
This also implies the following general scenario:
PA 3.1 is not rated high because there are gaps. The individual project realizes this and fills in
these gaps in a project-specific way. In such a case, still PA 3.2 cannot be rated higher than PA
3.1. However, PA 2.1 or PA 2.2, respectively, may be rated high in that project. Recall that
project-specific solutions are addressed at capability level 2 while capability level 3 addresses
the organization across projects.

---

<!-- Page 218 -->

GP 3.1.1 Establish and maintain the standard process
[PA3.1.RL.25] If the indicator 3.2.4 is downrated due to missing or inadequate informa-tion from
monitoring the performance of the process, then GP 3.1.1 shall not be rated F.
GP 3.2.1 Deploy a defined process that satisfies the context specific requirements of the use of
the standard process.
[PA.3.2.RL.10] If the indicator GP 3.1.1 is downrated due to missing or inadequate definition of
the standard process, the indicator GP 3.2.1 shall be downrated.
GP 3.2.2 Ensure required competencies for the defined roles.
[PA3.2.RL.11] If the indicator GP 3.1.1 is downrated due to missing or inadequate definitions of
roles, responsibilities and authorities, the indicator GP 3.2.2 shall be downrated.
[PA3.2.RL.12] If the indicator GP 3.1.2 is downrated due to missing or inadequate definitions of
competencies, skills or experience, the indicator GP 3.2.2 shall be downrated.
GP 3.2.3 Ensure required resources to support the performance of the defined process.
[PA3.2.RL.13] If the indicator GP 3.1.3 is downrated due to missing or inadequate definitions of
resources, the indicator GP 3.2.3 shall be downrated.
GP 3.2.4 Monitor the performance of the defined process.
[PA3.2.RL.14] If collecting and analyzing the required information is not performed according to
the defined methods and activities (GP 3.1.4), the indicator GP 3.2.4 shall be downrated.

---

<!-- Page 219 -->

5.3.2 Rating rules between capability level 2 and 3
Process attribute 3.1 Process Definition is one of the few process attributes which does not have
a dependency on the lower process attributes.
The rationale is that whether the lower process attributes are performed well or poorly may or
may not affect the definition of the standard process.
However, for a capability level 3 the standard process has to cover all aspects of capa-bility level
1 and 2 and a feedback mechanism to regularly check and improve the standard process itself.
Therefore, the rating of the process attribute PA 3.1 is independent of the project.
If this standard process is used the following picture shows the dependencies of PA 3.2 to level
2:
GP 3.2.2 Ensure required competencies for the defined roles
[PA3.2.RL.15] If GP 2.1.3 is downrated due to missing or inadequate determination of
responsibilities, authorities, knowledge or skills the indicator GP 3.2.2 shall be downrat-
ed.
Rationale: If there is a weakness on GP 2.1.3 regarding definition of the responsibilities and
authorities this weakness could be evident in two possible scenarios on level 3:
·
The weakness is also found in the GP 3.1.2, the identification of roles, competencies etc. which
in turn would lead to a weakness in the project which is using this standard process. (GP 3.2.2.)
The standard process is rated F regarding GP 3.1.2 but the project does not use the process
properly, otherwise the GP 2.1.3 would not be downrated

---

<!-- Page 220 -->

[PA3.2.RL.16] If the identification, allocation and availability of resources (GP 2.1.4) is downrated
due to human resources issues, the indicator GP 3.2.2 shall be downrated.
[PA3.2.RL.17] If GP 2.1.4 is downrated due to missing or inadequate qualification of individuals,
then GP 3.2.2 shall be downrated.
GP 3.2.3 Ensure required resources to support the performance of the defined process.
[PA3.2.RL.18] If the identification, allocation and availability of resources (GP 2.1.4) is downrated
due to physical or material resource issues, then GP 3.2.3 shall be downrated.
Rationale: If there is a weakness on GP 2.1.4 regarding identification and availability of the
resources, especially technical resources this weakness could be evident in two possible
scenarios on level 3:
• The weakness is also found in the GP 3.1.3, the determination of resources (human, material,
process infrastructure), which in turn would lead to a weakness in the project which is using
this standard process (GP 3.2.3.).
• The standard process is rated F regarding GP 3.1.3 but the project does not use the process
properly, otherwise the GP 2.1.4 would not be downrated.
5.3.3 Rating rules to other processes
Dependencies to PIM.3 Process Improvement and ORG.1 Life Cycle Model Management Process
(ISO/IEC TS 33060:2020, ISO/IEC TS 33061:2021) are obvious but not described, because both
are not part of the recommended VDA Scope.

---

<!-- Page 221 -->

6 Understanding capability
level 4
Based on the enterprise's business goals, the management derives information needs (GP 4.1.1
and GP 4.1.2). For those information needs metrics, or a set of combined metrics, are defined
(GP 4.1.4). Further, target thresholds (control limits, see GP 4.1.5) are determined proactively,
indicating which quantitative data is considered satisfacto-ry, and which is not.
Now, for each process instance quantitative data is measured according to those met-rics, and
recorded (GP 4.1.6). The evolving data history is analyzed by means of reasonable statistical
methods to see if the target thresholds (control limits) are exceeded (GP 4.1.1); note that, in
practice, the data history can also be used as the basis for determining the control limits (i.e.,
observing and understanding "what is normal").
If a particular process instance is identified as violating the control limits (GP 4.2.1) then a causal
analysis is performed for that process instance to understand the "special cause of variation" (GP
4.2.2). Such special causes of variation are, by definition, specific to one individual process
instance. Once understood, process instancespecific measures are taken to meet the control
limits again (GP 4.2.3).
In practice it is usually considered unfeasible to manually collect and combine quantita-tive data.
Therefore, such data should be extractable from repositories, tools, or given reports. Further, it
must be identified who takes the responsibility for analyzing and delivering the data to whom.
Note that capability level 4 requires a full capability level 3 as its basis. That is to say, achieving
capability level 3 makes it possible to compare quantitative process perfoㄱmance data across
process instances (e.g., projects, organizational units) for the Automotive SPICE process under
consideration. Otherwise, such data would not be comparable per se.

---

<!-- Page 222 -->

Figure 6-1 Understanding of capability level 4 for one particular process instance
Capability level 4 nor 5 do not predefine which statistical analyses or methods are to be used, or
whether a process mean is to be reduced or raised. The reason is that Automotive SPICE is at
the WHAT level (see Automotive SPICE PAM section 3.3).

---

<!-- Page 223 -->

7 Understanding capability
level 5
Capability level 4 identifies "special causes of variations" from control limits (thresholds) in
individual process instances. In addition, capability level 5 identifies "common causes of variation"
across all process instances. At the same time, the control limits (thresholds), within which
quantitative process performance data is expected to remain, are made narrower.
When common causes of variation are identified, the standard processes (since capa-bility level
3) aim to reduce common causes of variation. This is to say, the standard processes are improved,
and the quantitative process performance data gathered by capability level 4 is observed to see
if data variance across process instances has ac-tually been reduced. If not, the approach is
iterated. The exact statistical methods to use, and the desired thresholds (control limits)
optimization will depend on the process information needs (see GP 4.1.2), and (combination of)
metric(s) chosen (see GP 4.1.4).
Additionally, capability level 5 considers adopting meaningful state of the art approaches and
industry best practices regarding both product and process development.
Capability level 4 nor 5 do not predefine which statistical analyses or methods are to be used, or
whether a process mean is to be reduced or raised. The reason is that Automotive SPICE is at
the WHAT level (see Automotive SPICE PAM section 3.3).
Figure 7-1
Understanding of capability level 5 on reducing variation across process instances based on com
mon causes

---

<!-- Page 224 -->

Part 2: Guidelines for
performing the assessment
The purpose of part two of the current publication is to support the assessors in performing an assessment based on the
Automotive SPICE process reference and assessment model, considering the requirements of ISO/IEC 33002 [/SO33002].
Chapter 6 "Documented assessment process" provides necessary input for performing the assessment defined in ISO/IEC
33002 [ISO33002]. It provides the tasks and activities of the so-called evaluation phase, in which the assessment is planned,
prepared, performed and documented.
In chapter 7 "Improvement process" an overview of the tasks and activities are given, for the case that the assessment results
are to serve as an input for subsequent improvement measures. In this so-called improvement phase the assessment results
of the evaluation phase are used to plan, execute and track the process improvement actions.
Chapter 8 "Recommendations for performing an assessment" provides additional requirements when applying the documented
assessment process.
In chapter 9 "Requirements relating to assessor qualification" the requirements for assessors to demonstrate the competencies
to conduct an assessment and to monitor and verify the conformance of a process assessment are given.

---

<!-- Page 225 -->

8 Documented
assessment process
8.1 Introduction
This chapter provides a documented assessment process (DAP) according to ISO/IEC 33002
[ISO33002], clause 4.1:
The assessment shall be conducted according to a documented assessment pro-cess. The
documented assessment process shall be capable of meeting the assessment purpose and
shall be structured in a manner that ensures that the puㄱpose for performing the
assessment is satisfied, in terms of the rigor and independence of the assessment and its
suitability for the intended use.
The documented assessment process provided was set up to serve most assessments within
the automotive domain. It fulfils the requirements of ISO/IEC 33002 [ISO33002] under the
following preconditions:
• The assessment is using the PRM and PAM Automotive SPICE 4.0 and subsequent versions.
• The assessment is using the process measurement framework defined in Automo-tive
SPICE 4.0 which is an adaptation of ISO/IEC 33020:2019 "Process measurement framework
for assessment of process capability" [ISO33020].
• A defined rating and aggregation method according to ISO/IEC 33020:2019 is used
[ISO33020].
• The assessment is classified as "Class 3" according to ISO/IEC 33002 [/SO33002], clause 4.6.
• The category of independence of the body performing the assessment, the lead assessor
and the other members of the assessment team is A, B or C according to ISO/IEC 33002,
Annex A [ISO33002].
• The assessment is not intended to evaluate organizational maturity.
It is the responsibility of the lead assessor to evaluate whether the assessment provides the
given preconditions. In case of deviations, the lead assessor shall take appro-priate steps to
modify this given DAP or select another suitable one. In this case the

---

<!-- Page 226 -->

lead assessor takes responsibility for the conformity of the DAP to ISO/IEC 33002 [ISO33002].
8.2 Assessment input and output
8.2.1 Assessment plan
According to ISO/IEC 33002 [ISO33002] an assessment plan shall be set up. According to this
DAP the assessment plan shall contain the following elements:
• required inputs specified in this standard→ 8.2.2
• definition of the class of assessment and the category of independence of the body
performing the assessment, the lead assessor and the other members of the assessment
team → 8.1
• communications to the personnel involved in the assessment → 8.3
• identification of the documented assessment process including:
the strategy and techniques for the selection, identification, collection and analy-sis of
objective evidence and data, to satisfy any requirements for coverage of the process
scope of the assessment as defined for class 3 assessments → 8.4.1
the approach to derive an agreed process attribute rating, where relevant 8.4.1 and Part
activities to be performed in the assessment → 8.4
resources and schedule assigned to these activities → 8.4
identification and definition of roles and responsibilities of the participants in the
assessment → 8.3
criteria to verify that the requirements of ISO/IEC 33002 [ISO33002] are met → 8.1
description of the planned assessment outputs → 10.4
8.2.2 Assessment inputs

---

<!-- Page 227 -->

According to ISO/IEC 33002 [ISO33002] the necessary assessment input shall be identified.
According to this DAP the necessary input shall contain as a minimum the following elements:
• identity of the sponsor and the sponsor's relationship to the organizational unit(s) being
assessed
• business context including the organization's business goals and circumstances of the
assessment
• purpose of the assessment, e.g., process improvement or evaluation of the process capability
assigned to a specific product delivery
• assessment scope as it applies to the business comprising a defined and declared organization
scope, including:
the processes to be investigated within the assessment
the process quality characteristic to be investigated, including the highest pro-cess capability
level for each individual process within the assessment scope the organizational unit(s)
that deploy the process
the boundaries of the assessed organization, including:
the size of each organizational unit, e.g., number of personnel
development) of the products or services of each organizational unit
key characteristics (e.g., size, criticality, quality) of the products or services of each
organizational unit
the process context including the set of stakeholder requirements and changes which are under
investigation
the process instances, which have been selected, if applicable
• identity of the model(s) and process measurement framework used:
Automotive SPICE 4.0 or higher
Automotive SPICE 4.0 process measurement framework
• assessment requirements, including:
reference to this documented assessment process

---

<!-- Page 228 -->

definition of the class of assessment and the category of independence of the body
performing the assessment the lead assessor and the other members of the assessment
team
rating method(s) to be employed
aggregation method(s) to be employed
• assessment constraints considering, at minimum:
availability of key resources
maximum duration of the assessment
specific processes or organizational units to be excluded from the assessment
• ownership of the assessment outputs and any restrictions on their use
• controls for handling confidential information and nondisclosure
• participants and their roles, the assessment team and assessment support staff with specific
responsibilities for the assessment
• criteria for competence of the lead assessor.
8.2.3 Assessment report
The requirements and recommendations for the assessment report are defined in detail in
chapter 8.4.
8.2.4 Objective evidence gathered
For evaluating the processes within the assessment scope objective evidence and ad-ditional
information shall be collected. Each evidence shall be traceable to associated assessment
indicators (base practices, information items, generic practices, etc.).
8.3 Parties and roles involved in the assessment
The main parties involved in the assessment are the sponsor, the assessing organization,

---

<!-- Page 229 -->

and the assessed organization. The following roles shall be identified:
LAC: Local Assessment Coordinator
Individual or entity, who takes responsibility for the organization of the assessment within
the organizational unit assessed.
SP: Sponsor
Individual or entity, internal or external to the organizational unit to be assessed, who
requires the assessment to be performed, and provides financial or other resources to
carry it out (see ISO/IEC 33001 [/SO33001], clause 3.2.9).
AS: Co-Assessor
Individual who participates in the rating of process attributes (see ISO/IEC 33001
[ISO33001], clause 3.2.11). Assessors have appropriate education, training and both
capability assessment experience and domain experience to perform the required class of
assessment and make professional judgments (see ISO/IEC 33001 [ISO33001], clause
3.2.11).
LA: Lead Assessor or Assessment team leader
Assessor who has demonstrated the competencies to conduct an assessment and to
monitor and verify the conformity of a process assessment (see ISO/IEC 33001
[ISO33001], clause 3.2.12).
PP: Participant
Individual from the organizational unit to be assessed, who takes part in the assessment.
Note: While the role definitions provided above are considered to represent the stand-ard
approach to responsibility distribution, it is possible that individual assessments may extend or
reduce these role definitions as is appropriate for a given assessment. For example, the SP may
be knowledgeable of process assessment and may therefore participate in the detailed aspects
of the assessment. The LAC may also be capable of performing a greater role in the process
assessment depending on their knowledge and training with respect to process assessment.
For the description of the responsibilities the following abbreviations are used:

---

<!-- Page 230 -->

R: Responsible
Those who do the work to execute the task. There is at least one role with a participation
type of responsible, although others can be delegated to assist in the work required (see
also RACI below for separately identifying those who participate in a supporting role).
A: Accountable (also approver or final approving authority)
The one ultimately answerable for the correct and thorough completion of the deliv-erable
or task, and the one who delegates the work to those responsible. In other words, an
accountable must sign off (approve) work that responsible provides. There must be only
one accountable specified for each task or deliverable.
C: Consulted (sometimes counsel)
Those whose opinions are sought, typically subject matter experts; and with whom there
is two-way communication.
1: Informed
Those who are kept up to date on progress, often only on completion of the task or
deliverable; and with whom there is just oneway communication.
8.4 Assessment activities

---

<!-- Page 231 -->

• The assessment process consists of three tasks:
• prepare the assessment
• perform the assessment
• report the assessment.
8.4.1 Prepare the assessment
The preparation for an assessment is split into two subtasks:
8.4.1.1 Initiate the assessment

---

<!-- Page 232 -->

In the initialization phase the sponsor determines the need for an assessment and determines
the framework conditions (scope, time period, team, etc.). All necessary information on the
assessed organization is collected.
Determine the need for an assessment
The need for an assessment must be determined by the sponsor. This may be derived based on
different use cases and defines the purpose of the assessment. Examples for use cases are
given in chapter 1.2.1. The purpose of the assessment is the base input for setting up the
assessment scope.
Establish the assessment agreement

---

<!-- Page 233 -->

The assessment agreement is established based on the assessment purpose by
• defining the main focus of the assessment. This may be, for example, project management,
engineering aspects or other areas of risk. If appropriate, a preselection should be made of
the processes to be checked.
• determining the assessing organization, which is responsible for performing the assessment,
• selecting the lead assessor and the assessment team members,
• defining the timeframe, within which the assessment should be carried out, and
• identifying the business divisions or departments and personnel in the organization assessed
that are to be involved.
Define the assessment scope
The boundaries of the assessment, provided as part of the assessment input, encompassing
• the boundaries of the organizational unit for the assessment,
• the processes to be included,
• the capability level for each process to be assessed, and
• the context within which the processes operate
are defined.
Collecting and evaluating information on the organization

---

<!-- Page 234 -->

assessed
The information on the organization assessed which is relevant to the assessment must be
collected and evaluated. This may include:
• organizational structure of all those involved in the project, such as
sponsor,
project team,
core/platform development,
(independent) quality assurance department,
(independent) test department or
subsuppliers
• standard software components/off the shelf items
• if appropriate, the department responsible for the selection, release and maintenance of tools
or the it department, for example for configuration management
• results of other audits and assessments.
Note: Results from previous audits and assessments can be used for determining the
assessment scope. Here, the time has to be considered that has passed since the audit or
assessment and whether the results are applicable for the project (assessment method,
assessed department, personnel involved).
Define the assessment team
The assessment team is determined and appointed.
8.4.1.2 Agree on the assessment

---

<!-- Page 235 -->

The exact terms of the assessment are agreed between the involved parties.
Agree the details of how the assessment shall be performed
With the assessment agreement, a consensus regarding the assessment should be achieved by
defining details of how the assessment shall be performed and agree them between the parties.
It is essential that the sponsor, the assessing organization, and the organization assessed agree
on the modalities of the assessment. The agreement can be reached formally by means of a
contract and acknowledgement, or in an informal manner. Fuㄱthermore, the assessment
agreement must consider and specify the following points:
• A nondisclosure agreement (NDA) should be agreed by all parties involved (assessing
organization, organization assessed and assessors) and signed (if not already done in the
project).
• The final schedule is agreed.

---

<!-- Page 236 -->

• Contact persons are appointed on both sides for coordination.
• The distribution list for the report is established.
• Requirements relating to the evidence repository for the assessment are established.
• Requirements relating to the infrastructure, e.g., meeting rooms, beamers, printers, flipcharts
etc. are established.
• Constraints for the scheduling, e.g., availability due to bank holidays, breaks, local conventions
etc. are identified.
Perform preassessment meeting (optional)
If necessary, a preassessment meeting can be carried out (onsite, by email or by a
telecommunications conference). The purpose is to
• explain the framework and process of the assessment to the personnel involved
• specify the set of documents to be handed out to the assessment team in advance for study
• to understand and confirm the assessment context
• to perform preliminary document analysis.
8.4.2 Perform the assessment
The execution of the assessment is split into four tasks:
In the introduction task the assessment scope, the project to be assessed and the assessment
method are presented. This is followed by the interviews and document reviews, where the
actual collection of evidence is done which is the crucial part of the assessment. Once the
collection of evidence has been completed, the consolidation task starts, and the first evaluation
of the results (findings) takes place. Finally, in the feedback and evaluation task, the collected
results are stored in the evidence reposito-ry, the preliminary process attribute rating results are
presented, and possible immediate actions are recommended.

---

<!-- Page 237 -->

8.4.2.1 Introduction
The introduction should give all those involved an overview of the organization assessed, the
project, the assessment methodology and sequence.
Present the organization assessed and the project
The organization presents itself and the project in the scope to be assessed to the assessment
team. The purpose of this activity is to provide the assessment team with an introduction to the
project-specific conditions and circumstances.
Present the assessment activities
The assessment team presents the concrete activities of the Automotive SPICE assessment.
The purpose of this activity is to inform the organization assessed and the interviewees about
the detailed procedure which will be followed during the assessment (for example, the evidence
repository).

---

<!-- Page 238 -->

8.4.2.2 Interviews and checks of evidence
Evidence which is relevant to the project in terms of the selected processes is collected and
documented.
Perform interviews, document checks and inspections of the work
environment, if appropriate
Based on the assessment schedule, interviews on the individual processes with the key
personnel of the organization assessed are carried out and the associated documents, work
products and evidence are examined (using the two-sourcesofevidenceprinciple here can be
meaningful). If necessary, the conditions under which the process is performed can be checked
at the workplace.
The results of the interviews are documented in the assessment notes.

---

<!-- Page 239 -->

Collect evidence for rating the processes
The assessment team collects the evidence to justify and document the findings for the
individual processes (for example, with regard to process compliance, the tools used in the
project and the quality of existing documents or work products).
8.4.2.3 Consolidation
The evidence collected from interviews and document reviews is consolidated by the
assessors.
Note: The consolidation might also be done incrementally after each interview session, see chap
ter 8.4.2.2.
Evaluate the collected evidence
Following the interviews and the document reviews the assessment team consolidates and
documents the analysis results and reaches consensus on the identified strengths and potential
improvements of the processes which have been assessed.

---

<!-- Page 240 -->

Provide a provisional rating
Based on the findings the process attributes are rated and a provisional set of process capability
profiles is determined for the assessed processes. The rating is evaluated to ensure the
consistency with the rules given in part one of this publication. The rating shall consider the rating
rules given in Part 1 of this document.
Document strengths and potential improvements
The findings are evaluated in terms of strengths and potential improvements.
Establish the traceability of process attribute rating to evidence
For each process attribute rating the traceability to the collected evidence used in determining
that rating is established. The relationship between the assessment indicators for each process
attribute rated and the objective evidence is documented.
Document the deviation of rating rules
The rules not obeyed by the lead assessor are identified. A justification, why the rule is not
applicable or why it has no significant impact on the process attribute rating, is pro-vided.
Note: The purpose of the justification is to briefly document the lead assessor's decision to not
follow a specific rule. It is the clear intention of the authors of this publication not to generate
additional effort due to extensive documentation of rule deviations. The provision of a list of all
rules, no matter whether they are obeyed or not might make sense for inexperienced assessors
and might give an overview but is not required or intended by the authors of this publication.

---

<!-- Page 241 -->

8.4.2.4 Feedback and evaluation
The purpose of feedback is to provide information on the assessment results and to reach a
common understanding of the rating.
The feedback shall contain the following as a minimum:
• the provisional process attribute ratings
• the provisional process capability profiles
• the major strengths and potential improvements (for each process assessed).
The feedback should be provided directly following the conclusion of all interviews. The contents
of the feedback should be documented in writing as a feedback presentation and afterwards
made available as a copy to the assessed party.

---

<!-- Page 242 -->

Present the results
If possible, immediately after the assessment the provisional process attribute ratings and the
capability profiles are prepared and presented to the organization assessed. The most important
findings (strengths and potential improvements) are presented.
Identify immediate actions (optional)
Based on the presented identified potential improvements, immediate actions are recommended
to eliminate critical weaknesses.
Store the evidence in the repository
The organization assessed stores the evidence repository including references to the documents
which have been analyzed.
8.4.3 Report the assessment
The elaboration and distribution of the report following an assessment is split into two tasks:
The detailed assessment report is drawn up in order to document the results of the assessment.
The assessment log is prepared and submitted to the certification body.

---

<!-- Page 243 -->

8.4.3.1 Establish the assessment report
Consolidate the final process attribute ratings and the final process
capability profiles
The set of final process capability profiles is drawn up. The consolidated findings and observations
are documented in detail based on the assessment notes.
Compile the assessment report
The assessment report must be compiled, checked and released by the assessment team. The
lead assessor is responsible for drawing up and releasing the assessment report. Deviations from
rating rules given in Part 1 of this publication shall be documented in the assessment report. The
assessment report is provided within normally four calendar weeks to the assessment sponsor
for distribution in assessed organiza-tion. Please refer to chapter 10.4 for detailed requirements
on the assessment report.

---

<!-- Page 244 -->

Distribute the assessment report
The released version is distributed within the assessed organization.
8.4.3.2 Establish the assessment log
Issue the assessment log
The assessment log serves as the official confirmation from the sponsor, the LAC, and the
assessment team that the assessment was conducted according to the defined assessment
process.
The assessment log shall be signed by the lead assessor and the assessment team members.
The log shall be approved by the sponsor.
The assessment log shall be drawn up on the basis of the template provided by the certification
scheme (see chapter 11 "Requirements relating to assessor qualification").

---

<!-- Page 245 -->

9 Improvement process
9.1 Introduction
The process improvement phase may follow the evaluation phase and is split into the planning
on the process improvement actions, and performing and into tracking these actions.
Since the improvement actions will in general not be assigned to the roles involved in the
evaluation phase, no detailed assignment of responsibilities is given in this chapter, albeit the
responsibility for planning, performing and tracking all improvement actions lies with the
assessed organization.
9.2 Improvement activities
9.2.1 Plan the process improvements
The process improvement actions are established, together with the monitoring criteria,
responsibilities and the time schedule.

---

<!-- Page 246 -->

9.2.1.1 Define the improvement actions
Specify the process improvement actions
A list of process improvement actions is established including the desired improvement result
based on the assessment report. A traceability to the identified assessment find-ings is provided,
if applicable.
Prioritize the process improvement actions
Prioritization is performed based on an evaluation of the effectiveness of the improvement
actions.
Define the monitoring criteria
Based on the list of process improvement actions monitoring criteria are defined which allow
checking whether the implementation of the actions have the desired effects.

---

<!-- Page 247 -->

9.2.1.2 Schedule, assign and agree the improvements
Define the responsibilities
The improvement actions are assigned to persons who are responsible for their implementation.
Define the time schedule for implementation
Dates and priorities are assigned to the individual process improvement actions. Based on a risk
assessment, the actions from the list are identified which are to be implemented in the project
and/or in the organization which has been assessed.
Agree on the improvement actions
An agreement on the improvements is achieved from all affected parties.

---

<!-- Page 248 -->

9.2.2 Perform the process improvements
Immediate actions should be carried out directly after the assessment. Other process
improvement actions are implemented according to the defined schedule.
9.2.2.1 Performing process improvement actions
Execute the process improvement actions
The process improvement actions should be carried out in due time by those responsible and
according to priority.

---

<!-- Page 249 -->

9.2.3 Track the process improvement to closure
Tracking the process improvement actions represents the completion of the improvement
process:
The process improvement actions are monitored and any necessary adjustments are made,
taking risks into account.
9.2.3.1 Monitor, adjust and verify the actions
Monitor the process improvement actions
Based on the defined monitoring criteria the process improvement actions are checked regularly
regarding their implementation and effectiveness.

---

<!-- Page 250 -->

Modify improvement actions if deficiencies are detected
If the actions do not achieve the desired effect, modified or new actions are specified.
Verify and close improvement actions
The improvement actions are closed, if they achieved their purpose.
Plan long term actions exceeding the project scope
Long term actions exceeding the project scope should be addressed within a road map.

---

<!-- Page 251 -->

10 Recommendations
for performing an
assessment
In the current chapter recommendations are provided, which should be considered when
following the documented assessment process specified in chapter 8.
10.1 Assessment results
10.1.1 Confidentiality of information
As a fundamental rule, assessment results and the information obtained during an assessment
must be treated as confidential by all persons and organizations involved.
10.1.2 Handling the assessment results
The ownership of the assessment results is defined in the initial assessment agreement (see
8.4.1.1); by default, the sponsor is the owner of the results.
If the assessment results are issued to third parties, an additional nondisclosure agreement
should be signed where appropriate to maintain the confidentiality.
The assessment results and any relevant part of them should be made available within normally
four calendar weeks after the assessment to all individuals involved in the assessed project and
individuals involved in the performance and monitoring of the improvement actions. The criterion
here is their involvement in the project or process development.
The assessment results should be documented and archived by the assessing organization.

---

<!-- Page 252 -->

10.2 Validity of assessments
10.2.1 Area of validity of the assessment results
Automotive SPICE is predominantly used to assess single projects based on a given scope. In
these assessments the focus is always on one particular project. Neither the complete set of all
projects in an organization nor a statistically significant selection is investigated. It follows
therefore that assessment results are a representative sample of the process capability within
the scope of the assessment, but not applicable in general to the assessed organization as whole,
the development location or the entire compa-ny.
The assessment results may be considered to reflect potential capability of another project with
identical characteristics. Here the following criteria should be considered:
• Development locations: As a general rule, assessment results are not transferable from one
location to another.
• ECU domains: If at a large development location ECUs are developed for various domains,
such as powertrain, chassis or body, assessment results are transferable only to a limited
degree, given the different development environments.
• Distributed development: Where the development work on ECUs is distributed over several
departments or several locations, the assessment results apply only to those locations or
departments which have been assessed.
The extent to which assessment results can be transferred will depend on various factors,
including the process capability level, and must be evaluated on a caseby-case basis.
10.2.2 Period of validity of assessment results
Assessment results have only a limited validity in terms of time. Experience has shown that they
allow reliable conclusions to be drawn for 12 months regarding the project which has been
assessed.
Changes within the project, such as, for example
• the transfer of the development work to a different location,
• a reorganization in the organization which has been assessed or
• changes to the development processes

---

<!-- Page 253 -->

can, however, significantly affect the relevance of the assessment results to individual processes
even within 12 months. Such changes may cause the actual capability of the development
process to be better or worse than indicated by the last assessment re
sult.
On the other hand, where there is a high degree of project stability, the assessment results may
permit reliable conclusions regarding the project to be drawn for longer than 12 months. For these
reasons, the period of validity must always be considered relative to the specific project
circumstances.
10.3 Performing an assessment
The following recommendations should be observed when performing assessments:
10.3.1 General
The assessment team leader has the authority, and the responsibility, to take any nec-essary
precautions and actions to ensure that the assessment is conducted in compliance with the
relevant ISO/IEC 330xx parts, the Automotive SPICE 4.0 measurement framework and this
document. This includes the right to dismiss individuals (assessment team or interviewees), or
to cancel interviews.
10.3.2 Assessment scheduling
When planning the assessment, at a minimum the following conditions should be considered:
• the scope of the assessment, specifically the number of assessed processes, the number of
process instances and the highest assessed level
• the process context as defined in chapter 1.2.3.
• the complexity of the assessed project, e.g., in terms of distributed developments,
• size of the assessment scope, complexity of the developed product
• results and experiences from previous assessments
• assessment experience of the assessed party
• problems associated with different cultures and languages, e.g., organize cultural trainings or
a translator.
Based on this sufficient interview and consolidation time frames should be planned.

---

<!-- Page 254 -->

There should be at least four weeks between agreement on an assessment and its execution.
In some cases it could be appropriate to perform interviews for data collection only using phone
and/or video conferences.
10.3.3 Individuals involved in the assessment
The assessing organization performing the assessment decides on the composition of the
assessment team in consultation with the sponsor (see also 10.3.4).
Participation by observers or other guests in interviews:
• In principle, observers can be present at an interview e.g., observers from the process
development department.
• The number of people taking part in the interview should be kept as small as possible.
• The interviews must not be impaired by observers, whether active or passive.
• The assessment team leader decides whether observers may be present at the interviews
and can exclude observers (in general or particular individuals) even during the course of the
assessment.
10.3.4 Composition of the assessment team
The assessment should be carried out by at least two assessors. The lead assessor must have
at minimum a valid competent assessor certification.
Independence of the assessors should be ensured in order to avoid any conflict of interest.
The assessment team leader must ensure that there is sufficient competence on the team
regarding the PAM used and technical domain knowledge (e.g., hardware devel-opment in the
case of assessing the HWE.x processes, machine learning in the case of assessing MLE.x
processes).
The assessment team leader has the final authority for the selection of the assessor(s) and to
exclude assessors and participants from the assessment.

---

<!-- Page 255 -->

10.4 Assessment report
In the assessment report the organization which has been assessed is given more detailed
feedback of the strengths and potential improvements detected in the assessment. The
assessment report should document in particular those points which led to a downrating of the
process attribute by referencing the individual base or generic prac-tices.
The assessment report should contain the following information:
10.4.1 General information
This chapter contains general information on the assessment report.

---

<!-- Page 256 -->

10.4.2 Formal information about the assessment
This chapter contains formal information about the assessment.
10.4.3 Purpose and scope of the assessment
This chapter contains information about the assessment scope. Refer also to chapter 1.2.2
"Defining the assessment scope".

---

<!-- Page 257 -->

10.4.4 Participants of the assessment
This chapter contains information about the assessment team, the interview persons and other
participants of the assessment.

---

<!-- Page 258 -->

10.4.5 Constraints
This chapter contains information about constraints and possible impacts of these constraints
that have to be considered to understand the assessment results.

---

<!-- Page 259 -->

10.4.6 Assessment results
The following table defines the minimum content of an assessment report, and expected quality
criteria.

---

<!-- Page 260 -->

The following table describes optional, i.e., not mandatory, content in an assessment report.

---

<!-- Page 261 -->

11 Requirements relating to
assessor qualification
It is essential that Automotive SPICE assessments are conducted by appropriate and trained
specialists. The lead assessor entrusted with the leadership of the assessment, who also accepts
responsibility for the result of the evaluation, plays a special role.
The training of assessors shall be carried out by registered training organizations based on a
published certification scheme.
The personal certification of assessors shall be carried out by a certification body on the basis of
a published certification scheme. The certification scheme shall cover the guidance, the rules
and the recommendations given within this publication.
Acceptance of valid qualification schemes for assessors is carried out by the quality management
board of the VDA QMC. Currently, the intacs scheme is a valid and ac-cepted qualification
scheme [intacs].
11.1 Requirements for assessors
According the definitions provided in ISO/IEC 33001 [ISO33001], clause 3.2.11, the term
"assessor" is defined as:
individual who participates in the rating of process attributes
A valid personal Automotive SPICE Provisional, Competent or Principal SPICE Assessor license
issued by the VDA QMC is required as evidence for the qualification and experience of any
assessor who is member of the assessment team.
11.2 Requirements for lead assessors
According the definitions provided in ISO/IEC 33001 [ISO33001], clause 3.2.12, the term “lead
assessor” is defined as:
Assessor who has demonstrated the competencies to conduct an assessment and to monitor
and verify the conformance of a process assessment.

---

<!-- Page 262 -->

REQUIREMENTS RELATING TO ASSESSOR QUALIFICATION 263
A valid personal Automotive SPICE competent or principal assessor license or a valid instructor
license issued by the VDA QMC covering the entire assessment scope is required as evidence
for the qualification and experience of the lead assessor.
11.3 Requirements for nonlead assessors
According the definitions provided in ISO/IEC 33001 [ISO33001], clause 3.2.11, the term
"assessor" is defined as:
individual who participates in the rating of process attributes
A valid personal Automotive SPICE provisional, competent or principal assessor license or a valid
instructor license issued by the VDA QMC is required as evidence for the qualification and
experience of any other assessor who is member of the assessment team.

---

<!-- Page 263 -->

Bibliography
[ISO33001] ISO/IEC 33001:2015, Information technology Process assessment Concepts
and terminology, 2015-03
[ISO33002] ISO/IEC 33002:2015, Information technology Process assessment Requirements
for performing process assessment, 2015-03
[ISO33020] ISO/IEC 33020:2019, Information technology Process assessment Process
measurement framework for assessment of process capability, 2019-11
[ISO24765] ISO/IEC/IEEE 24765:2017, Systems and software engineering Vocabulary,
2017-09
[ISO29148] ISO/IEC/IEEE 29148:2018, Systems and software engineering Life cycle
processes Requirements engineering, 2018-11
[ISO19011] ISO 19011:2018, Guidelines for auditing management systems
[ISO26262] ISO 26262:2018, Road vehicles Functional safety, 2018-12
[Metz2016] Dr. Pierre Metz, Automotive SPICE Capability level 2 und 3 in der Praxis,
August 2016, dpunkt.verlag, ISBN 978-3-86490-360-1
[IntAgile] Frank Besemer, Timo Karasch, Dr. Pierre Metz, Joachim Pfeffer, Intacs
white paper, Clarifying Myths with Process Maturity Models vs. Agile,
Aug 6th 2014, www.intacs.info
[IREB CPRE] IREB International Requirements Engineering Board Foundation Level
CPRE, https://www.ireb.org/en/cpre/foundation/
[INCOSE] INCOSE Guide for Writing Requirements INCOSE International Council
on Systems Engineering, https://www.incose.org/
[intacs] International Assessor Certification Scheme, www.intacs.info
[AS40] Process Reference Model, Process Assessment
Model, Version 4.0®, 2023-10
Automotive SPICE

---

<!-- Page 264 -->


---

<!-- Page 265 -->

Quality Management in the Automotive Industry
You can find the current status of the published VDA volumes on Quality Management
in the Automotive Industry (QAI) on the Internet at http://www.vda-qmc.de.
You can also place orders directly on this homepage.
Reference:
Verband der Automobilindustrie e.V. (VDA)
Qualit ts Management Center (QMC)
Behrean̈straße 35, 10117 Berlin, Germany
Phone +49 (0) 30 8978 42-235,
Fax +49 (0) 30 8978 42-605
Email: info@vda-qmc.de, Internet: www.vda-qmc.de

---
