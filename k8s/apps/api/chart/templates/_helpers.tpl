{{- define "api.name" -}}
{{- .Chart.Name -}}
{{- end -}}

{{- define "api.fullname" -}}
{{- .Release.Name | trunc 63 | trimSuffix "-" -}}
{{- end -}}