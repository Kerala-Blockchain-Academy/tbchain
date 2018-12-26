
Addressing Scheme:

The address scheame used in the project is simple and efficient.  This is in such a way that at any given moment a state address can be derived based on the input value collected from the GUI. 
Following is the list of predifed address patterns used:

  TB_FAMILY      = 'tbdots'  		[Default family name]
  TB_MEDICINE    = '000001MEDICINE'	[Master list for medicine details]
  TB_USER        = '000111USER' 	[Master list for manufacture details]
  TB_PATIENT     = '000333PATIENT'	[Master list for patient details]
  TB_INTAKE      = '000555INTAKE'	[Master list for medicine consumption details]


All the transactions have the same 6 hex digit prefix, which is the first 6 hex characters of the SHA-512 hash of "tbdots".
Each Manufacture & Patient is identified by with a corresponding public/private keypair which will be generated dynamically at the time of their registration.

The manufacture details is stored at a 70 hex digit address derived from:
* a 6-hex character prefix of the "tbdots" Transaction Family namespace and
* a 7-hex character prefix of the text "000111USER" and
* the first 57-hex characters of the patient name.

The patient details is stored at a 70 hex digit address derived from:
* a 6-hex character prefix of the "tbdots" Transaction Family namespace and
* a 7-hex character prefix of the text "000333PATIENT" and
* the first 57-hex characters of the patient name.

The medicine details entered by the manufacture, is stored at a 70 hex digit address derived from:
* a 6-hex character prefix of the "tbdots" Transaction Family namespace and
* a 6-hex character prefix of the text "000001MEDICINE" and
* a 6-hex character prefix of the first 6 letters of medicine unique id and
* the first 52-hex characters prefix of the medicine unique id.
